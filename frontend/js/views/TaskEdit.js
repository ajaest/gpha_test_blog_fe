(function (task_manager) {
    
    task_manager
    .config(['$routeProvider', function ($routeProvider) {
        
        function getTaskInstance($route, Task){
            var task = new Task();
            
            return Task.get({id: $route.current.params.id}).$promise
            .then(function (obj){
                
                if (obj.due){
                    obj.due = new Date(obj.due);
                }
                
                obj.created  = new Date(obj.created);
                obj.modified = new Date(obj.modified);
            
                return obj;
            });
        }
        
        getTaskInstance.$inject = [
            '$route', 
            'Task'
        ];
        
        $routeProvider
        .when('/tasks/:id', {
            title         : 'Edit task'               ,
            templateUrl   : '/partials/task-form.html',
            controller    : 'TaskEditController'      ,
            resolve       : {
                'taskIns': getTaskInstance
            }
        });
          
    }]);
    
})(window.angular.module('task-manager'));