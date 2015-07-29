from django.utils import dateparse

import django.test

import foundationsk.models as models
import time
import json

class TestAPIModel(django.test.TestCase):
    
    #===========================================================================
    # Test list view
    #===========================================================================
    
    task1 = None
    task2 = None
    
    def setUp(self):
        super(TestAPIModel, self).setUp()
        
        self.task1 = models.Task.objects.create(
             summary     = 'summary1'    ,
             description = 'description1',
             priority    = 1             ,
             due         = None          ,
             finished    = True
        )
        
        # Assures that automatic datetimes do not equal
        time.sleep(1)
        
        self.task2 = models.Task.objects.create(
             summary     = 'summary2'    ,
             description = 'description2',
             priority    = 2             ,
             finished    = False
        )
        
        # Sanity inequality preconditions are not necessary, but makes tests 
        # easier
        
        for field in models.Task._meta.fields:  # @UndefinedVariable @UnusedVariable
            self.assertNotEqual(
                getattr(self.task1, field.name),
                getattr(self.task2, field.name)
            )
             
    
    def test_can_read_task_list(self):
        
        response = self.client.get('/api/rest/v1/tasks/')
        
        self.assertEqual(response.status_code, 200)
        
        objects = json.loads(response.content)
        
        # Same len of objects
        self.assertEqual(len(objects), 2)
        
        # The objects are ordered by due date, so task1 must be
        # first
        
        self.assertEqual(
            objects[1]['id'],
            self.task1.id
        )
        
        self.assertEqual(
            objects[1]['summary'],
            self.task1.summary
        )
        
        self.assertEqual(
            objects[1]['finished'],
            self.task1.finished
        )
        
        self.assertEqual(
            objects[1]['priority'],
            self.task1.priority
        )
        
        self.assertEqual(
            dateparse.parse_datetime(objects[1]['modified']),
            self.task1.modified
        )
        
        self.assertEqual(
            objects[1]['due'],
            self.task1.due
        )
        
        # Second object
        
        self.assertEqual(
            objects[0]['id'],
            self.task2.id
        )
        
        self.assertEqual(
            objects[0]['summary'],
            self.task2.summary
        )
        
        self.assertEqual(
            objects[0]['finished'],
            self.task2.finished
        )
        
        self.assertEqual(
            objects[0]['priority'],
            self.task2.priority
        )
        
        self.assertEqual(
            dateparse.parse_datetime(objects[0]['modified']),
            self.task2.modified
        )
        
        self.assertEqual(
            dateparse.parse_datetime(objects[0]['due']),
            self.task2.due
        )