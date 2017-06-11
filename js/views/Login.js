(function (blog){

    blog
    .config(['$routeProvider', function ($routeProvider){
        $routeProvider.when('/login', {
            title: 'Login',
            templateUrl   : '/partials/login.html',
            controller    : 'LoginController'     ,
        })
    }]);

})(angular.module('blog'));