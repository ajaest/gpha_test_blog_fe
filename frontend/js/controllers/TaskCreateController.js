(function (task_manager) {
    'use strict';
    
    function TaskCreateController(
        $scope   ,
        Task     
    ){
        $scope.obj = new Task();
        
        
        
        $scope.saveObject = function (evt) {
        
            $scope.obj.$save()
                .then(function (obj) {
                    location.href = '/#/tasks/' + obj.id + '?created';
                })
                .catch(function (error){
                    $scope.message = null;
                    $scope.error = 'Error creating the task.';
                    
                    $scope.error_data = error.data;
                })
            ;
        };
    }
        
    TaskCreateController.$inject = [
        '$scope'   ,
        'Task'     
    ];

    task_manager
    .controller('TaskCreateController', TaskCreateController);
    
})(window.angular.module('task-manager'));