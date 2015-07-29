(function (task_manager) {
    'use strict';
    
    function TaskFactory(
        $resource, 
        config
    ){
        return $resource(config.api_url('/tasks/:id'));
    }
    
    TaskFactory.$inject = [
        '$resource' , 
        'config'
    ];
    
    task_manager
    .factory('Task', TaskFactory);
    
})(window.angular.module('task-manager'));  