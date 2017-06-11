(function (blog){

    const CLIENT_ID = '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4';
    const CLIENT_SECRET = '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k';

    function LoginController(
        $scope,
        $http,
        $location,
        $rootScope
    ){
        $scope.doLogin = function (){
            $http({
                url: 'http://localhost:8000/oauth/v2/token',
                method: 'POST',
                data: {
                    grant_type: 'password',
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    username: $scope.email,
                    password: $scope.password,
                }
            })
                .then(function (data){
                    $rootScope.loggedInUserEMail = $scope.email;
                    $http.defaults.headers.common['Authorization'] = "Bearer " + data.data.access_token;
                    $location.path('/')
                })
        }
    }

    LoginController.$inject = [
        '$scope',
        '$http',
        '$location',
        '$rootScope'
    ];

    blog.controller('LoginController', LoginController)

})(angular.module('blog'));