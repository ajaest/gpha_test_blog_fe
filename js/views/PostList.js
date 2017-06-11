(function (blog) {
    'use strict';
    
    blog
    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider
        .when('/', {
            title         : 'Post list'               ,
            selected_menu : 'post-list'               ,
            templateUrl   : '/partials/post-list.html',
            controller    : 'PostListController'
        });
          
    }]);
    
})(window.angular.module('blog'));