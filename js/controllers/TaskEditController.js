(function (blog) {
    'use strict';
    
    function PostEditController(
        $scope      ,
        postIns     ,
        $routeParams,
        $route      ,
        $location
    ){
        $scope.obj = postIns ;
        
        if ('created' in $routeParams){
            $scope.message = 'The post was created successfully.';
        }

        $scope.editable = $routeParams.id == 'new';

        $scope.addTag = function (){
            $scope.obj.tags.push({name: $scope.editingTag})
            $scope.editingTag = '';
        };

        $scope.$watch('editingImage', function (newVal){
            if(newVal){
                $scope.obj.content = {
                    name: newVal.filename,
                    value: newVal.base64,
                    size: newVal.filesize,
                    mimeType: newVal.filetype
                }
            }
        });

        $scope.saveObject = function (evt) {
            var savePromise;

            // Set the type
            $scope.obj.type = $route.current.type.replace(/s$/, '');

            if($scope.obj.id)
                savePromise = $scope.obj.$update();
            else
                savePromise = $scope.obj.$save()
            ;

            savePromise
                .then(function (obj) {
                    $scope.editable = false;
                    $scope.message = 'The post was saved.';
                    $scope.error = null;

                    $location.url('/posts/' + $route.current.type + '/' + obj.id + '?created')
                })
                .catch(function (error){
                    $scope.editable = true;
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
        '$route'      ,
        '$location'
    ];

    blog
    .controller('PostEditController', PostEditController);
    
})(window.angular.module('blog'));