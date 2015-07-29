import rest_framework.serializers as rest_serializers
import foundationsk.models        as models 

class TaskBaseSerializer(rest_serializers.ModelSerializer):
    
    class Meta:
        model = models.Task

class TaskSummarySerializer(TaskBaseSerializer):
    
    class Meta(TaskBaseSerializer.Meta):
        fields  =(
            'finished',            
            'summary' ,
            'priority',
            'modified',
            'due'
        )
    

class TaskDetailSerializer(TaskBaseSerializer):
    
    class Meta(TaskBaseSerializer.Meta):
        fields  =(
            'finished'   ,
            'summary'    ,
            'description',
            'priority'   ,
            'created'    ,
            'modified'   ,
            'due'
        )
    