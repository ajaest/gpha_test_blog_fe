(function (blog) {
    
    blog
    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider
        .when('/posts/new', {
            title         : 'Create new post'         ,
            selected_menu : 'post-create'             ,
            templateUrl   : '/partials/post-create.html',
        });
          
    }]);
    
})(window.angular.module('blog'));