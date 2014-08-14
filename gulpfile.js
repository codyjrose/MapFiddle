// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');

// Concatenate & Minify JS
gulp.task('scripts', function () {
    gulp.src(['js/**/*.js', '!js/**/*.min.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))

    gulp.src('js/vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist'));

    gulp.src('dist/*.js')
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('dist'));

    gulp.src(['dist/*.js', '!dist/*.min.js'], { read: false })
        .pipe(rimraf({ force: true }));

});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('js/*.js', 'scripts');
});

// Default Task
gulp.task('default', ['scripts', 'watch']);
