(function (task_manager) {
    
    task_manager
    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider
        .when('/', {
            title      : 'Task list'               ,
            templateUrl: '/partials/task-list.html',
            controller : 'TaskListController'
        });
          
    }]);
    
})(window.angular.module('task-manager'));