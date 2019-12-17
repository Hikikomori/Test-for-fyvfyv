const
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  del = require('del'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  sourcemap = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  server = require("browser-sync").create();

// sass tasks
gulp.task('sass', () =>
    gulp.src('src/scss/style.scss')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest('dist/css/'))
        .pipe(server.stream())
);

gulp.task('sass_dev', () =>
    gulp.src('src/scss/style.scss')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(rename("style.min.css"))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest('dist/css/'))
        .pipe(server.stream())
);

// javascript tasks
gulp.task('js_dev', () =>
    gulp.src('src/js/script.js')
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(rename("script.min.js"))
        .pipe(gulp.dest('dist/js/'))
);

gulp.task('js', () =>
  gulp.src('src/js/script.js')
      .pipe(babel({ presets: ['@babel/preset-env'] }))
      .pipe(uglify())
      .pipe(rename("script.min.js"))
      .pipe(gulp.dest('dist/js/'))
);

// sass lint ftw(for better coding practices)
gulp.task('sass_lint', () => {
  const gulpStylelint = require('gulp-stylelint');
  return gulp
    .src('src/scss/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});

// images optimization works with jpeg, jpg, svg, gif, png
gulp.task('images', () =>
  gulp.src('src/images/*')
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('dist/images/'))
);
// Just copy/paste
gulp.task('html', () =>
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'))
);

gulp.task('fonts', () =>
    gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
);

gulp.task('clean', () => {
  return del(['dist/**']);
});

gulp.task('server', () => {
  server.init({
    server: {
      baseDir: 'dist/',
      notify: false,
      open: true,
      cors: true,
      ui: false
    },
    port: 8000
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('sass_dev'));
  gulp.watch('src/js/script.js', gulp.series('js_dev'));
  gulp.watch('src/index.html').on('change', gulp.series('html', server.reload));
});

gulp.task('build', gulp.series('clean', 'sass', 'js', 'images', 'fonts', 'html'));

gulp.task('default',  gulp.series('sass_dev', 'js_dev', 'images', 'fonts', 'html', 'server'));
