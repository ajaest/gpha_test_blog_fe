(function (task_manager) {
    
    task_manager
    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider
        .when('/tasks/new', {
            title      : 'Create new task'         ,
            templateUrl: '/partials/task-form.html',
            controller : 'TaskCreateController'
        });
          
    }]);
    
})(window.angular.module('task-manager'));