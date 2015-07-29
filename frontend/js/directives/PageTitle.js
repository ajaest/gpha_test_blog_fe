(function (task_manager) {
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
    
    task_manager
    .directive('pageTitle', PageTitleDirective);
    
})(window.angular.module('task-manager'));