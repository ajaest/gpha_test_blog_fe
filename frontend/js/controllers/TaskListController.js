(function (task_manager) {
    'use strict';
    
    function TaskListController(
        $scope,
        Task
    ){
        $scope.objs = Task.query();
        
        $scope.objs.$promise
        .catch(function (error){
            $scope.error = 'Error retrieving the task list.';
        });
    }
    
    TaskListController.$inject = [
        '$scope',
        'Task'
    ];
      
    task_manager
    .controller('TaskListController', TaskListController);
    
})(window.angular.module('task-manager'));