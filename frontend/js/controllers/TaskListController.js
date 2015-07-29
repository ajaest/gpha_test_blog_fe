(function (task_manager) {
    
    function TaskListController(
        $scope,
        Task
    ){
        $scope.objs = Task.query();
        
        $scope.objs.$promise
        .catch(function (error){
            $scope.error = 'Error retrieving the task list.';
        });
        
        $scope.objs.$promise
        .then(function (){
            var i = $scope;
        });
    }
    
    TaskListController.$inject = [
        '$scope',
        'Task'
    ];
      
    task_manager
    .controller('TaskListController', TaskListController);
    
})(window.angular.module('task-manager'));