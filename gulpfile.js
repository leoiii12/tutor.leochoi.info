var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
    sass: ['./scss/**/*.scss'],
    controllers: ['./www/js/controllers/*.js'],
    directives: ['./www/js/directives/*.js'],
    services: ['./www/js/services/*.js'],
    filters: ['./www/js/filters/*.js']
};

gulp.task('default', ['watch', 'sass', 'controllers', 'directives', 'services', 'filters']);

gulp.task('sass', function (done) {
    gulp.src(paths.sass)
      .pipe(sass({
          errLogToConsole: true
      }))
      .pipe(minifyCss({
          keepSpecialComments: 0
      }))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest('./www/css/'))
      .on('end', done);
});

gulp.task('controllers', function () {
    gulp.src(paths.controllers)
      .pipe(concat('controllers.js'))
      .pipe(gulp.dest('./www/js/'));
});

gulp.task('directives', function () {
    gulp.src(paths.directives)
      .pipe(concat('directives.js'))
      .pipe(gulp.dest('./www/js/'));
});

gulp.task('services', function () {
    gulp.src(paths.services)
      .pipe(concat('services.js'))
      .pipe(gulp.dest('./www/js/'));
});

gulp.task('filters', function () {
    gulp.src(paths.filters)
      .pipe(concat('filters.js'))
      .pipe(gulp.dest('./www/js/'));
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.controllers, ['controllers']);
    gulp.watch(paths.directives, ['directives']);
    gulp.watch(paths.services, ['services']);
    gulp.watch(paths.filters, ['filters']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
      .on('log', function (data) {
          gutil.log('bower', gutil.colors.cyan(data.id), data.message);
      });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
          '  ' + gutil.colors.red('Git is not installed.'),
          '\n  Git, the version control system, is required to download Ionic.',
          '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
          '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});