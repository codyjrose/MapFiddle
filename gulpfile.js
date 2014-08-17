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
    gulp.src(['src/**/*.html'])
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
            'css': 'css/styles.css'
        }))
        .pipe(gulp.dest('dist/'));
});

// Copy HTML files to dist folder
gulp.task('assets', function () {
    // Copy fonts to dist/css folder
    gulp.src(['src/assets/**/*.*'])
        .pipe(gulp.dest('dist/assets'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('src/js/*.js', 'scripts');
});

// Default Task
gulp.task('default', ['scripts', 'css', 'watch']);
gulp.task('build', ['scripts', 'css', 'html', 'assets']);