
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
	
	
	function disableStripTrailingSlashes($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }
    
    disableStripTrailingSlashes.$inject = [
        '$resourceProvider'
    ];
    
    task_manager.config(disableStripTrailingSlashes);
	
	// Application and route load flags and messages
	function registerActionsOnRouteChange($rootScope, config) {
	    $rootScope.app_ready = true;
	    $rootScope.loading   = true;
	   
        $rootScope.$on('$locationChangeStart', function (event, current, previous) {
            config.set_page_title('Loading resource...');
            $rootScope.loading = true;
        });
        
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            config.set_page_title(
                (current.$$route && current.$$route.title) || 
                'Finished'
            );
            $rootScope.loading = false;
        });
    }
	
	registerActionsOnRouteChange.$inject = [
        '$rootScope',
        'config'    ,    
    ];
	
	task_manager.run(registerActionsOnRouteChange);
	
	
	
	
})(window.angular);
