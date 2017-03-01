var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var paths = {
  sass: ['./scss/**/*.scss'],
  templateCache: ['./www/app/**/*.html'],
  ng_annotate: ['./www/app/*.js'],
};

//script paths
var jsFiles = './www/app/**/*.js',
  jsDest = './www/dist/app';

gulp.task('scripts', function () {
  return gulp.src(jsFiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});


gulp.task('templatecache', function (done) {
  gulp.src('./www/app/**/*.html')
    .pipe(templateCache({ standalone: true }))
    .pipe(gulp.dest('./www/js'))
    .on('end', done);
});

gulp.task('ng_annotate', function (done) {
  gulp.src('./www/app/**/*.js')
    .pipe(ngAnnotate({ single_quotes: true }))
    .pipe(gulp.dest('./www/dist/app'))
    .on('end', done);
});

gulp.task('default', ['sass', 'ng_annotate']);

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass'], paths.ng_annotate, ['ng_annotate']);
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
