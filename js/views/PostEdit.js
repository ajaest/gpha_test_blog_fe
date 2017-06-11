(function (blog) {
    
    blog
    .config(['$routeProvider', function ($routeProvider) {
        
        function getPostInstance($route, Post){
            if($route.current.params.id=='new'){
                return new Post({tags:[]});
            } else {
                return Post.get({id: $route.current.params.id, type: $route.current.type});
            }
        }
        
        getPostInstance.$inject = [
            '$route', 
            'Post'
        ];
        
        $routeProvider
            .when('/posts/texts/:id', {
                title         : 'Edit post'                    ,
                type          : 'texts'                        ,
                templateUrl   : '/partials/post-text-form.html',
                controller    : 'PostEditController'           ,
                resolve       : {
                    'postIns': getPostInstance
                }
            })
            .when('/posts/quotations/:id', {
                title         : 'Edit quotation'                    ,
                type          : 'quotations'                        ,
                templateUrl   : '/partials/post-quotation-form.html',
                controller    : 'PostEditController'                ,
                resolve       : {
                    'postIns': getPostInstance
                }
            })
            .when('/posts/images/:id', {
                title         : 'Edit image'                    ,
                type          : 'images'                        ,
                templateUrl   : '/partials/post-image-form.html',
                controller    : 'PostEditController'            ,
                resolve       : {
                    'postIns': getPostInstance
                }
            })
        ;
          
    }]);
    
})(window.angular.module('blog'));