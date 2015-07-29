
(function (angular) {
	'use strict';
	
	var task_manager;
	
	task_manager = angular.module(
	   'task-manager', 
	   [
	       'ngRoute'   ,
	       'ngResource'
	   ]
	);
	
	// Application and route load flags and messages
	function RegisterActionsOnRouteChange($rootScope, config) {
	    $rootScope.app_ready = true;
	    $rootScope.loading   = true;
	   
        $rootScope.$on('$locationChangeStart', function (event, current, previous) {
            config.set_page_title('Loading resource...');
            $rootScope.loading = true;
        });
        
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            config.set_page_title(current.$$route.title || 'Finished');
            $rootScope.loading = false;
        });
    }
	
	RegisterActionsOnRouteChange.$inject = [
        '$rootScope',
        'config'    ,    
    ];
	
	task_manager.run(RegisterActionsOnRouteChange);
	
	
	
})(window.angular);
