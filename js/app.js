
(function (angular) {
	'use strict';
	
	var blog;
	
	blog = angular.module(
	   'blog', 
	   [
	       'ngRoute'   ,
	       'ngResource',
           'naif.base64'
	   ]
	);
	
	
	function disableStripTrailingSlashes($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }
    
    disableStripTrailingSlashes.$inject = [
        '$resourceProvider'
    ];
    
    blog.config(disableStripTrailingSlashes);
	
	
	function addGlobalsToRootScope($rootScope){
	    $rootScope.moment     = window.moment;
	    $rootScope.page_title = null         ;
	    $rootScope.app_ready  = false        ;
        $rootScope.loading    = false        ;
	}
	
	addGlobalsToRootScope.$inject = [
        '$rootScope',
	];
	blog.run(addGlobalsToRootScope);
	
	
	function registerActionsOnRouteChange($rootScope, config) {
	    // Changes from loading app to loading page
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
            $rootScope.loading       = false;
            $rootScope.selected_menu = (current.$$route && current.$$route.selected_menu) || undefined; 
        });
    }
	
	registerActionsOnRouteChange.$inject = [
        '$rootScope',
        'config'    ,    
    ];
	
	blog.run(registerActionsOnRouteChange);
	
})(window.angular);
