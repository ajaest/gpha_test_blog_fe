import django
django.setup()

from django.utils import dateparse

import django.test

import foundationsk.models as models
import time
import json

class TestAPIModel(django.test.TestCase):
    """
    This class includes some unit test for the API, most of them unfinished.
    """
    
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
             
    
    def test_001_can_read_task_list(self):
        """
        Test that the endpoint '/api/rest/v1/tasks/' returns the correct
        objects from the database.
        """
        
        response = self.client.get('/api/rest/v1/tasks/')
        
        self.assertEqual(response.status_code, 200)
        
        objects = json.loads(response.content)
        
        # Same len of objects
        self.assertEqual(len(objects), 2)
        
        # Conversions necessary for comparison
        objects[0]['modified'] = dateparse.parse_datetime(objects[0]['modified'])
        
        objects[1]['modified'] = dateparse.parse_datetime(objects[1]['modified'])
        objects[0]['due'     ] = dateparse.parse_datetime(objects[0]['due'     ])
        # The objects are ordered by due date, so task1 must be
        # first
        
        self.assertEqual(objects[1]['id'      ], self.task1.id      )
        self.assertEqual(objects[1]['summary' ], self.task1.summary )
        self.assertEqual(objects[1]['finished'], self.task1.finished)
        self.assertEqual(objects[1]['priority'], self.task1.priority)
        self.assertEqual(objects[1]['modified'], self.task1.modified)
        self.assertEqual(objects[1]['due'     ], self.task1.due     )
        
        # Second object
        
        self.assertEqual(objects[0]['id'      ], self.task2.id      )
        self.assertEqual(objects[0]['summary' ], self.task2.summary )
        self.assertEqual(objects[0]['finished'], self.task2.finished)
        self.assertEqual(objects[0]['priority'], self.task2.priority)
        self.assertEqual(objects[0]['modified'], self.task2.modified)
        self.assertEqual(objects[0]['due'     ], self.task2.due     )
    
    def test_002_summary_fields(self):
        """
        Test that the endpoint '/api/rest/v1/tasks/' objects only have 'id',
        'summary', 'finished', 'priority', 'modified', and 'due' fields.
        """
        
        raise NotImplementedError()
    
    def test_003_summary_dates_timezone_aware(self):
        """
        Test that the endpoint '/api/rest/v1/tasks/' returns objects whose
        datetime fields are timezone aware 
        """
        
        raise NotImplementedError()
    
    def test_004_task_list_is_paged(self):
        """
        Test that the endpoint '/api/rest/v1/tasks/' returns the object list
        paginated by 10, and that the query parameters ``page`` and 
        ``page_size`` can be used to select the page
        """
        
        raise NotImplementedError()
        
    def test_005_task_list_finished(self):
        """
        Test that the endpoint '/api/rest/v1/tasks/finished' returns only
        finished tasks
        """
        
        raise NotImplementedError()
        
    def test_006_task_list_unfinished(self):
        """
        Test that the endpoint '/api/rest/v1/tasks/unfinished' returns only
        unfinished tasks.
        """
        
        raise NotImplementedError()
    
    def test_007_can_create_task(self):
        """
        A task instance can be created in the backend if a POST request is sent
        to '/api/rest/v1/tasks/'
        """
        
        raise NotImplementedError()
    
    def test_008_task_detail(self):
        """
        Test that the endpoint '/api/rest/v1/tasks/<pk>' returns the object
        defined by <pk>
        """
        
        to_retrieve_task_id = self.task1.id
        
        # Preconditions: the task exists
        to_retrieve_task = models.Task.objects.get(id = 1 )
        
        # Tested feature
        
        to_retrieve_url= '/api/rest/v1/tasks/' + str(to_retrieve_task_id)
        
        response = self.client.get(to_retrieve_url)
        
        obj = json.loads(response.content)
        # Conversions necessary for comparison
        obj['modified'] = dateparse.parse_datetime(obj['modified'])
        obj['created' ] = dateparse.parse_datetime(obj['created' ])
        
        # Postconditions
        
        self.assertEqual(response.status_code, 200)
        
        self.assertEqual(obj['id'      ], to_retrieve_task.id      )
        self.assertEqual(obj['summary' ], to_retrieve_task.summary )
        self.assertEqual(obj['finished'], to_retrieve_task.finished)
        self.assertEqual(obj['priority'], to_retrieve_task.priority)
        self.assertEqual(obj['modified'], to_retrieve_task.modified)
        self.assertEqual(obj['due'     ], to_retrieve_task.due     )
    
    
    # ... and more (for example, CRUD operations for detail endpoint, cannot 
    # create in .../finished and .../unfinished endpoints etc.)