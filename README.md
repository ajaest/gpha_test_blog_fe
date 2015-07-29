# Django+rest+angular 

This project is a simple full REST CRUD angular project backed by a 
python/django completely independent backend.

## Installing and running the backend

The best way to install the backend is creating a virtualenv for Python 2.7. 

From the project's root folder, please do:

    cd backend
    virtualenv .env
    source .env/bin/activate

With these commands we installed the virtualenv for our project and activated it.


|*warning*: in some operative systems, ``virtualenv`` for Python 2.7 is  referenced as either `virtualenv-2.7` or `virtualenv2.7`.|
| ------------------------------------------------------------------------------------------------------------------------------- |


Next we must install the dependencies. To do so, from the same folder (``backend``) just do:

    pip install -r requirements.txt
    
Next, we must create the sqlite database. To do so, just type:

    python manage.py syncdb --noinput

Finally, to run the backend debug server please do

    python manage.py runserver 0.0.0.0:8080 --traceback --noreload 
    
The server will be available from ``http:\\localhost:8080\api\rest\v1``.

## Testing

### Testing the backend

I included a test case for the API endpoints in foundationsk.tests module (``/backend/foundationsk/tests.py`` file). It includes a couple of implemented test cases, some unimplemented test cases and some propositions or further testing needed.

To run those tests just type from the ``backend`` folder with the _virtualenv_ activated:

    python manage.py tests