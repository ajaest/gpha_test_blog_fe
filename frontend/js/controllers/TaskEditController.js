(function (task_manager) {
    'use strict';
    
    function TaskEditController(
        $scope      ,
        taskIns     ,
        $routeParams,
        $location
    ){
        $scope.obj = taskIns ;
        
        if ('created' in $routeParams){
            $scope.message = 'The task was created successfully.';
        }
        
        $scope.saveObject = function (evt) {
        
            $scope.obj.$update()
                .then(function (obj) {
                    $scope.message = 'The task was updated.';
                    $scope.error = null;
                })
                .catch(function (error){
                    $scope.message = null;
                    $scope.error = 'Error updating the task.';
                    
                    $scope.error_data = error.data;
                })
            ;
        };
        
        $scope.removeObject = function (evt) {
        
            $scope.obj.$remove()
                .then(function (obj) {
                    $location.path('/');
                })
                .catch(function (error){
                    $scope.message = null;
                    $scope.error = 'Error deleting the task.';
                    
                    $scope.error_data = error.data;
                })
            ;
        };
    }
        
    TaskEditController.$inject = [
        '$scope'      ,
        'taskIns'     ,
        '$routeParams',
        '$location'
    ];

    task_manager
    .controller('TaskEditController', TaskEditController);
    
})(window.angular.module('task-manager'));