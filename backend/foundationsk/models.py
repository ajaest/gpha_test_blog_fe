
import django.utils.datetime_safe as datetime
import django.db.models           as db_models

class Task(db_models.Model):
    
    summary = db_models.CharField(
        max_length = 128  ,
        null       = False,
    )
    
    description = db_models.TextField(
        max_length = 4096 ,
        null       = False
    )
    
    priority = db_models.IntegerField(
        null    = False,
        choices = (
            (1, 'Very Important'),
            (2, 'Important'     ),
            (3, 'Normal'        ),
            (4, 'Trivial'       ),
        )
    )
    
    created = db_models.DateTimeField(
        auto_now_add = True ,
        null         = False,
    )
    
    modified = db_models.DateTimeField(
        auto_now = True
    )
    
    due = db_models.DateTimeField(
        default = datetime.datetime.now,
        null    = True
    )
    
    finished = db_models.BooleanField(
        default = False,
        null    = False
    )