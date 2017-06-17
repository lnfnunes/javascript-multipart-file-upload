'use strict';

let clean = require('gulp-clean');

let uglify = require('gulp-uglifyjs');

let gulp = require('gulp');

let descriptor = require('./package.json');

let config = require('./package.json');

config.path = {
  src: './src/main/**/*.js',
  dist: './dist/'
};

gulp.task(
  `${config.name}/clean`,
  function () {
    return gulp
      .src(config.path.dist)
      .pipe(clean());
  }
);

gulp.task(
  `${config.name}/build`, [`${config.name}/clean`],
  function () {
    return gulp
      .src(config.path.src)
      .pipe(uglify(descriptor.name+'.js'))
      .pipe(gulp.dest(config.path.dist));
  }
);

gulp.task(
  `${config.name}/watch`, function () {
    return gulp
      .watch(`${config.path.src}**/*.*`, [
        `${config.name}/build`
      ]);
  }
);
