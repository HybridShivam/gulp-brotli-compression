const gulp = require('gulp');
const brotli = require('gulp-brotli');

gulp.task('compress', function () {
  return gulp.src('data/**/*.{css,js,svg,csv,json}')
    .pipe(brotli.compress({
      quality: 11,
    }))
    .pipe(gulp.dest('data/'));
});