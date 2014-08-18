// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var streamqueue = require('streamqueue');
var minifyCSS = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');

// Concatenate & minify JS
gulp.task('scripts', function () {
    return gulp.src(['src/js/**/*.js', '!src/js/vendor/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Concatenate & minify CSS and copy fonts
gulp.task('css', function () {
    // Copy fonts to dist/css folder
    gulp.src(['src/css/*', '!src/css/*.css'])
        .pipe(gulp.dest('dist/css'));

    var stream = streamqueue({ objectMode: true });

    stream.queue(
        gulp.src(['src/css/*.css', '!src/css/*.min.css'])
            .pipe(minifyCSS())
    );

    stream.queue(
        gulp.src('src/css/*.min.css')
    );

    return stream.done()
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist/css'));
});

// Copy HTML files to dist folder
gulp.task('html', function () {
    // Copy fonts to dist/css folder
    gulp.src('src/**/*.html')
        .pipe(htmlreplace({
            'js': 'js/scripts.js',
            'cdn': [
                '//cdnjs.cloudflare.com/ajax/libs/prettify/r298/run_prettify.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular.min.js',
                '//ajax.googleapis.com/ajax/libs/angularjs/1.2.20/angular-route.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js'
            ],
            'css': 'css/styles.css',
            'ga': "<script>" +
                  "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
                  "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
                  "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
                  "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');" +
                  "ga('create', 'UA-38807124-2', 'auto');" +
                  "ga('send', 'pageview');" +
                  "</script>"
        }))
        .pipe(gulp.dest('dist/'));
});

// Watch Files For Changes
gulp.task('icons', function () {
    gulp.src('src/assets/icons/*.png')
    .pipe(gulp.dest('dist/assets/icons/'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('src/js/*.js', 'scripts');
});

// Default Task
gulp.task('default', ['scripts', 'css', 'html', 'icons']);