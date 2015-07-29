
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = (
    'rest_framework',
    'foundationsk'
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

TEMPLATE_CONTEXT_PROCESSORS = (
"django.core.context_processors.debug" ,
)

ROOT_URLCONF = 'foundationsk.urls'


WSGI_APPLICATION = 'foundationsk.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = False

USE_L10N = False

USE_TZ = True


SECRET_KEY = 'kweroa+@n%$!eq%o_^box!rz6&g)5db7#a4@%@_wws1y6tr^q5'