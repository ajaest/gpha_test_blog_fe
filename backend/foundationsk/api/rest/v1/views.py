import foundationsk.api.rest.v1.serializers as restV1_serializers
import rest_framework.generics              as rest_views


class TaskRESTDetailView(
    rest_views.RetrieveUpdateDestroyAPIView
):

    serializer_class = restV1_serializers.TaskDetailSerializer
    queryset         = serializer_class.Meta.model.objects
    
class TaskRESTListBaseView(
    rest_views.ListAPIView
):
    serializer_class = restV1_serializers.TaskSummarySerializer
    queryset         = serializer_class.Meta.model.objects

class TaskRESTListView_ALL(
    TaskRESTListBaseView    ,
    rest_views.CreateAPIView,
):
    pass

class TaskRESTListView_UNFINISHED(
    TaskRESTListBaseView
):

    def get_queryset(self):
        return super(TaskRESTListView_UNFINISHED, self) \
               .filter(
                    finished = False
                )
               
class TaskRESTListView_FINISHED(
    TaskRESTListBaseView
):

    def get_queryset(self):
        return super(TaskRESTListView_FINISHED, self) \
               .filter(
                    finished = True
                )