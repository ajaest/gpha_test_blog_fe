(function (blog) {
    'use strict';
    
    function PageTitleDirective($rootScope){
        
        return {
            link: function (scope, element){
                $rootScope.$watch('page_title', function (newValue, oldValue){
                    if (newValue !==oldValue)
                        element.text(newValue);    
                });
            },
        };
    }
    
    PageTitleDirective.$inject = [
        '$rootScope',
    ];
    
    blog
    .directive('pageTitle', PageTitleDirective);
    
})(window.angular.module('blog'));