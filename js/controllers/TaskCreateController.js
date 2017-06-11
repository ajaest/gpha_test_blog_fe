(function (blog) {
    'use strict';
    
    function PostCreateController(
        $scope   ,
        Post     
    ){
        $scope.obj = new Post();
        
        
        
        $scope.saveObject = function (evt) {
        
            $scope.obj.$save()
                .then(function (obj) {
                    location.href = '/#/posts/' + obj.id + '?created';
                })
                .catch(function (error){
                    $scope.message = null;
                    $scope.error = 'Error creating the post.';
                    
                    $scope.error_data = error.data;
                })
            ;
        };
    }
        
    PostCreateController.$inject = [
        '$scope'   ,
        'Post'     
    ];

    blog
    .controller('PostCreateController', PostCreateController);
    
})(window.angular.module('blog'));