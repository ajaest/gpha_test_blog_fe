(function (task_manager) {
    'use strict';
    
    task_manager
    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider
        .when('/', {
            title         : 'Task list'               ,
            selected_menu : 'task-list'               ,
            templateUrl   : '/partials/task-list.html',
            controller    : 'TaskListController'
        });
          
    }]);
    
})(window.angular.module('task-manager'));