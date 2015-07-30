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

## Installing an running the frontend

To run the frontend, first you need to install bower and node dependencies, to do so just run:

    npm install
    
That command will also automatically trigger ``bower install``.

To run the frontend debug server we use the ``default`` task defined in ``gulpfile.js` as follows:

    gulp
    
This command perform the following operations:

1. Creates a ``static`` folder in the ``frontend`` whose contents are going to be served in ``http:\\localhost:8888\``.
2. Clean all previously existing assets, if existing (that is, the ``static`` folder)
3. Copies all file structures in ``/frontend/html`` to ``static``.
4. Crawls all necessary js files in ``bower_componentes`` and the ``js`` folder and compiles them into a single file in ``static/js/app.js``, including sourcemaps for debugging.
5. Compiles the file ``frondend/less/main.less`` and all its dependencies in a single file ``public/styles/main.css``
6. Registers watches in all the compiled/copied files to restart the server if a change in these files occurs, starting the whole compiling/copy process again
7. Runs the server

There are 4 more tasks defined:

- ``clean-assets``
- ``compile-assets``
- ``watch-changes``
- ``webserver``

## Testing

### Testing the backend

I included a test case for the API endpoints in foundationsk.tests module (``/backend/foundationsk/tests.py`` file). It includes a couple of implemented test cases, some unimplemented test cases and some propositions or further testing needed.

To run those tests just type from the ``backend`` folder with the _virtualenv_ activated:

    python manage.py tests
    
# Some more nice features
- The backend is partially tested
- The angular elements are completely modularized and separated in different files
- The load stage is reflected by the page title, but styles/animations do not have much work.
- Backend validation in frontend.
- Different branch for frontend development (``frontend``)
    
# Some things that must be changed or fixed if this were a production environment or real project

- Finish API python tests
- Create a file ``frontent/js/utils/config-production.js`` which would register a different service similar to ``frontent/js/utils/config-debug.js`` with the production parameteres. This file should be imported 
- Create a gulp task named ``deploy-production`` to deploy the project in production. This task should:
  - Compress JS, HTML and CSS files when copying them to production
  - Include ``frontent/js/utils/config-production.js`` instead of ``frontent/js/utils/config-debug.js`` for the ``config`` angular service.
- Add pagination to the list models. Django API supports it, but making it work in angular is a little more complex, I just felt lazy doing it.
- There is a ton of corner cases without styling (I just did the mayor path). For example, errors, messages, loading screens, etc.
- When filtering the task list, the colors may be wrong.
- There is no frontend tests. At the end, I got tired and I did not write them, if you want to see them just tell me. I would write them using the karma runner with the chai assertion framework, mocha's test suite organizer and sinon for prototype instrospection over the files in the ``tests`` folder. I would describe tests for each controller and model and I would use angular's ng-mocks 