(function (blog) {
    'use strict';
    
    function PostListController(
        $scope,
        Post
    ){
        $scope.objs = Post.query();
        
        $scope.objs.$promise
        .catch(function (error){
            $scope.error = 'Error retrieving the post list.';
        });
    }
    
    PostListController.$inject = [
        '$scope',
        'Post'
    ];
      
    blog
    .controller('PostListController', PostListController);
    
})(window.angular.module('blog'));