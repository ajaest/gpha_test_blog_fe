(function (task_manager) {
    'use strict';
    
    function TaskCreateController(
        $scope   ,
        Task     ,
        $location
    ){
        $scope.obj = new Task();
        
        
        
        $scope.saveObject = function (evt) {
        
            $scope.obj.$save()
                .then(function (obj) {
                    $location.path('/tasks/' + obj.id);
                })
                .catch(function (error){
                    $scope.error = 'Error creating the task.';
                    
                    $scope.error_data = error.data;
                })
            ;
        };
    }
        
    TaskCreateController.$inject = [
        '$scope'   ,
        'Task'     ,
        '$location'
    ];

    task_manager
    .controller('TaskCreateController', TaskCreateController);
    
})(window.angular.module('task-manager'));