import django.conf.urls as urls
import foundationsk.api.rest.v1.urls as foundationsk_restV1_urls


urlpatterns = [
    urls.url(r'^api/', urls.include(foundationsk_restV1_urls)),
]
