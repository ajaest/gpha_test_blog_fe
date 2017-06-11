(function (blog) {
    'use strict';
    
    var base_path         = 'http://localhost:8000/api/blog/v1';
    var page_title_suffix = ' - Blog (Debug)'             ;
    
    function ConfigDebugService($rootScope){
                
        this.api_url = function (resource) {
            return base_path + resource;
        };
        
        this.set_page_title = function (page_title){
            var full_page_title = page_title  + page_title_suffix;
            
            $rootScope.page_title = full_page_title;
            
            return full_page_title;
        };
    }
    
    ConfigDebugService.$inject = [
        '$rootScope'
    ];
    
    blog
    .service('config', ConfigDebugService);
    
})(window.angular.module('blog'));