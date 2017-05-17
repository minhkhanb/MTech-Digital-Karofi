'use strict';
// generated on 2016-04-28 using generator-gulp-bootstrap3 0.4.4

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    del = require('del'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    include = require('gulp-include'),
    ejs = require('gulp-ejs'),
    gutil = require('gulp-util'),
	browserSync = require('browser-sync'),
    reload = browserSync.reload,
    flatten = require('gulp-flatten');
    
// Define paths
var paths = {  
  scripts:   ['./src/js/*.js'],
  w_scripts:   ['./src/js/**/*.js'],
  styles:    ['./src/css/*.{css,scss,sass}'],
  w_styles:    ['./src/css/**/*.{css,scss,sass}'],
  images:    ['./src/images/**/*'],
  media:    ['./src/media/**/*'],
  templates: ['./src/templates/*.ejs'],
  w_templates: ['./src/templates/**/*.ejs'],
  fonts: ['./src/fonts/**/*'],
  json: ['./src/js/*.json']
};

// CSS
gulp.task('css', function() {
  return sass(paths.styles, {
    style: 'expanded',
    loadPath: [
      process.cwd() + '/src/css/partials',
      process.cwd() + '/src/vendor'
    ]
  })
  //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss({compatibility: 'ie10'}))
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(notify({ message: 'CSS task complete' }));
});

// Javascript
gulp.task('js', function() {
  return gulp.src(paths.scripts)
    .pipe(include().on('error', gutil.log))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'JS task complete' }));
});


// Optimize images
gulp.task('images', function() {
  return gulp.src(paths.images)
    //.pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Templates
gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(ejs({}, {ext:'.html'}).on('error', gutil.log))
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Templates task complete' }));
});

// media
gulp.task('media', function() {
  return gulp.src(paths.media)
    .pipe(gulp.dest('dist/assets/media'))
    .pipe(notify({ message: 'media task complete' }));
});


// Copy fonts
gulp.task('fonts', function() {
  gulp.src(paths.fonts)
    .pipe(flatten())
    .pipe(gulp.dest('dist/assets/fonts'));
});
// Copy json data
gulp.task('json', function() {
  gulp.src(paths.json)
    .pipe(flatten())
    .pipe(gulp.dest('dist/assets/data'));
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('images','css', 'js',  'templates', 'fonts', 'json', 'media');
});
// Clean up
gulp.task('clean', function() {
  return del(['dist/*']);
});
// Serve
gulp.task('serve', function() {
  browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
});

// Watch
gulp.task('watch', ['serve'], function() {

  // Watch SASS files
  gulp.watch(paths.w_styles, ['css']);
  
  // Watch JS files
  gulp.watch(paths.w_scripts, ['js']);

  // Watch image files
  gulp.watch(paths.images, ['images']);
  
  // Watch media files
  gulp.watch(paths.media, ['media']);
  
  // Watch template files
  gulp.watch([paths.w_templates], ['templates']);
  
  // Watch for fonts
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.json, ['json']);

  // Watch any files in assets folder reload on change
  gulp.watch('dist/**/*').on('change', reload);

});