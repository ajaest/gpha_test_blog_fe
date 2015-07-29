import django.conf.urls as urls
import foundationsk.api.rest.v1.views as foundation_restV1_views

unprefixed_urlpatterns = urls.patterns('',

    urls.url(
        regex = '^tasks/(?P<pk>\d+)',
        view  = 
            foundation_restV1_views.TaskRESTDetailView.as_view()
        
    ),

    urls.url(
        regex = '^tasks/',
        view  = \
            foundation_restV1_views.TaskRESTListView_ALL.as_view()
    ),
                            
    urls.url(
        regex = '^tasks/finished',
        view  = \
            foundation_restV1_views.TaskRESTListView_FINISHED.as_view()
    ),
                            
    urls.url(
        regex = '^tasks/unfinished',
        view  = \
            foundation_restV1_views.TaskRESTListView_UNFINISHED.as_view()
    ),                        
)

# Prefix the URLS with the API version
urlpatterns = urls.patterns('',
    urls.url(
        '^rest/v1/',
        urls.include(unprefixed_urlpatterns)
    )
)