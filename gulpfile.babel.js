import gulp from "gulp";
import babel from "gulp-babel";
import terser from "gulp-terser";
import concat from "gulp-concat";

// HTML
import htmlmin from "gulp-htmlmin";
// PUG
import pug from "gulp-pug";
const production = true;

// SASS
import sass from "gulp-sass";

//CSS
import postcss from "gulp-postcss";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";
/*tarea para el CSS
Variables y constantes
*/
const cssPlugins = [cssnano(), autoprefixer()];

// Clean CSS
import clean from "gulp-purgecss";

// Cache bust
import cacheBust from "gulp-cache-bust";

//Tarea minificar el html
gulp.task("html", () => {
  return gulp
    .src("./src/template/page/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: false,
      })
    )
    .pipe(gulp.dest("./public"));
});

// tarea para minificar y juntar en un solo archivo JS  los JS
gulp.task("babel", () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(concat("scripts-min.js"))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest("./public/js"));
});

gulp.task("views", () => {
  return gulp
    .src("./src/template/page/*.pug")
    .pipe(
      pug({
        pretty: production ? false : true,
      })
    )
    .pipe(
      cacheBust({
        type: "timestamp",
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("sass", () => {
  return gulp
    .src("./src/scss/style.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest("./public/css"));
});

// Limpiar codiigo css inutil
gulp.task("clean", () => {
  return gulp
    .src("./public/css/style.css")
    .pipe(
      clean({
        content: ["./public/*.html"],
      })
    )
    .pipe(gulp.dest("./public/css"));
});

// tarea por defecto con un watch
gulp.task("default", () => {
  // gulp.watch("./src/template/**/*.html", gulp.series("html"));
  gulp.watch("./src/template/**/*.pug", gulp.series("views"));
  // gulp.watch("./src/css/*.css", gulp.series("style"));
  gulp.watch("./src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("./src/js/*.js", gulp.series("babel"));
});
