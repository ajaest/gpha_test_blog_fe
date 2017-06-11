(function (blog) {
    'use strict';
    
    function PostFactory(
        $resource, 
        config
    ){
        return $resource(config.api_url('/posts/:type/:id'), {id: '@id'},{
            'get'   : {method:'GET'                 },
            'save'  : {method:'POST'                },
            'query' : {method:'GET'   , isArray:true},        
            'delete': {method:'DELETE'              },
            'update': {method:'PUT'                 }
        });
    }
    
    PostFactory.$inject = [
        '$resource' , 
        'config'
    ];
    
    blog
    .factory('Post', PostFactory);
    
})(window.angular.module('blog'));