(function (task_manager) {
    'use strict';
    
    function TaskFactory(
        $resource, 
        config
    ){
        return $resource(config.api_url('/tasks/:id'), {id: '@id'},{
            'get'   : {method:'GET'                 },
            'save'  : {method:'POST'                },
            'query' : {method:'GET'   , isArray:true},        
            'delete': {method:'DELETE'              },
            'update': {method:'PUT'                 }
        });
    }
    
    TaskFactory.$inject = [
        '$resource' , 
        'config'
    ];
    
    task_manager
    .factory('Task', TaskFactory);
    
})(window.angular.module('task-manager'));  