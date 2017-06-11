(function (blog) {
    'use strict';
    
    function PostEditController(
        $scope      ,
        postIns     ,
        $routeParams,
        $location
    ){
        $scope.obj = postIns ;
        
        if ('created' in $routeParams){
            $scope.message = 'The post was created successfully.';
        }

        $scope.editable = !$scope.obj.id;

        $scope.addTag = function (){
            $scope.obj.tags.push({name: $scope.editingTag})
            $scope.editingTag = '';
        };

        $scope.saveObject = function (evt) {
            var savePromise;
            if($scope.obj.id)
                savePromise = $scope.obj.$update();
            else
                savePromise = $scope.obj.$save()
            ;

            savePromise
                .then(function (obj) {
                    $scope.message = 'The post was saved.';
                    $scope.error = null;
                })
                .catch(function (error){
                    $scope.message = null;
                    $scope.error = 'Error saving the post.';
                    
                    $scope.error_data = error.data;
                })
            ;
        };
    }
        
    PostEditController.$inject = [
        '$scope'      ,
        'postIns'     ,
        '$routeParams',
        '$location'
    ];

    blog
    .controller('PostEditController', PostEditController);
    
})(window.angular.module('blog'));