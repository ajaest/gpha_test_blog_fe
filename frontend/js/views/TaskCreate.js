(function (task_manager) {
    
    task_manager
    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider
        .when('/tasks/new', {
            title         : 'Create new task'         ,
            selected_menu : 'task-create'             ,
            templateUrl   : '/partials/task-form.html',
            controller    : 'TaskCreateController'
        });
          
    }]);
    
})(window.angular.module('task-manager'));