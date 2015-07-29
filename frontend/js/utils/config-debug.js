(function (task_manager) {
    
    var base_path = 'http://localhost:8080/api/rest/v1';
    
    function ConfigDebugService(){
        
        this.api_url = function (resource) {
            return base_path + resource;
        };
    }
    
    task_manager
    .service('config', ConfigDebugService);
    
})(window.angular.module('task-manager'));