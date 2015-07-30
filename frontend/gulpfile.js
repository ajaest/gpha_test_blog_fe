var gulp       = require('gulp'           ),
    connect    = require('gulp-connect'   ),
    less       = require('gulp-less'      ),
    path       = require('path'           ),
    del        = require('del'            ),
    sourcemaps = require('gulp-sourcemaps'),
    concat     = require('gulp-concat'    ),
    fs         = require('fs'             )
;

// Auxiliary function to get a full qualified
// path from a path relative to this file
function gulpath(relpath){
    return path.join(__dirname, relpath);
}

// DRY definition of all the assets that the app
// requires (and thus GLUP should process)
var assets = {
    
    'html' : {
        src: gulpath('html/**/*.html'),
        dst: gulpath('public/'       )
    },

    'less': {
    	paths: [
    	    gulpath('less/'                                         ),
    	    gulpath('bower_components/bootstrap/less/'),
    	],
    	// References all necessary less files
        src  : [
            gulpath('bower_components/bootstrap/less/bootstrap.less'),
            gulpath('less/main.less'                                ),
        ],
        dst  : gulpath('public/styles/')
    },

    'js' : {
        src : [
            // 3th party dependencies
            // JQuery is required by bootstrap and is used as a side effect by
            // angular
            gulpath('bower_components/jquery/dist/jquery.js'         ),
            // Moment.js is used to print dates nicely
            gulpath('bower_components/moment/moment.js'              ),
            gulpath('bower_components/angular.js/angular.js'         ),
            gulpath('bower_components/angular.js/angular-route.js'   ),
            // Angular-resource is used to modify models
            gulpath('bower_components/angular.js/angular-resource.js'),
            // Bootstrap is used for styling and animations
            gulpath('bower_components/bootstrap/dist/js/bootstrap.js'),
            // Custom logic (mostly angular files). Order is not important
            // as the dependecy injection system do not require dependencies to
            // be ordered.
            gulpath('js/**/*.js'),
            
        ],
        dst : gulpath('public/js/')
    },
};

// Task to start a basic reloadable server
gulp.task('webserver', ['compile-assets'], function() {
    // Subtask webserver starts a simple HTTP 
    // file server
    connect.server({
        // Configures the server so that any 
        // change to any file in the scope
        // causes the server to reload
        livereload: true              ,
        root      : gulpath('public/'),
        port      : 8888
    });
});


// Task to clean the assets previously 
// compiled/moved
gulp.task('clean-assets', function (cb) {
    
	var public_folder = gulpath('public/');
	
    del([public_folder], function () {
    	fs.mkdir(public_folder, cb);
    });
    
});

// Task to compile assets
gulp.task('compile-assets', ['clean-assets'], function() {
    
	// HTML files, just copy
	gulp
		.src(assets.html.src)
		.pipe(gulp.dest(assets.html.dst))
		// Reload if any file changes
		.pipe(connect.reload())
	
	// LESS files, compile to CSS
    gulp
        .src(assets.less.src)
        // Compile 
        .pipe(less({
            'paths': assets.less.paths
        }))
        .pipe(gulp.dest(assets.less.dst))
        // Reload if any file changes
        .pipe(connect.reload())
    ;

    gulp
        .src(assets.js.src)
        // Start catching js files for sourcemaps
        .pipe(sourcemaps.init())
        // Concat all files into a single app.js
        .pipe(concat('app.js'))
        // End catching js files for sourcemaps, create sourcemaps and compile
      	.pipe(sourcemaps.write())
      	// Copy all source-mapped files and app.js
        .pipe(gulp.dest(assets.js.dst))
        // Reload if any file changes
        .pipe(connect.reload())
    ;
    
});

gulp.task('watch-changes', ['compile-assets'], function (){
   
    var todo = [
        'compile-assets'  ,
    ];

    gulp.watch(assets.less.src, todo);
    gulp.watch(assets.js  .src, todo);
    gulp.watch(assets.html.src, todo);
    
});

// Set the default task as a combination of three
// tasks. First, clean old assets, then compile 
// the new ones, continie initializing the 
// webserver and. finally, activate the watchers.
gulp.task('default', [
        'webserver',
        'watch-changes'
]);
