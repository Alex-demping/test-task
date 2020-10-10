var gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  include = require("gulp-include"),
  del = require("del"),
  rename = require("gulp-rename");
fileinclude = require("gulp-file-include");

function html(done) {
  gulp
    .src("src/templates/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: `src/templates/`,
        indent: true,
        context: {
          ribbon: "true",
        },
      })
    )
    .pipe(gulp.dest("./src/"))
    .pipe(browserSync.stream());
  done();
}

function sync(done) {
  browserSync.init({
    server: {
      baseDir: "src",
      directory: true,
    },
    port: 3000,
  });
  done();
}

function css(done) {
  gulp
    .src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errLogToConsole: true,
      })
    )
    .on("erorr", console.error.bind(console))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(rename("style.css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
  done();
}

function libsJs(done) {
  gulp
    .src("src/js/app.js")
    .pipe(
      include({
        extensions: "js",
        hardFail: true,
        separateInputs: true,
        includePaths: [__dirname],
      })
    )

    .pipe(rename("libs.js"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(concat("libs.min.js"))
    .pipe(gulp.dest("src/js"));

  done();
}

function js(done) {
  gulp.src("src/js/**/*.js").pipe(browserSync.stream());
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function watchFile() {
  gulp.watch("./src/templates/**/*", html);
  gulp.watch("./src/templates/**/*.html", browserReload);
  gulp.watch("./src/**/*.scss", css);
  gulp.watch("./src/**/*.scss", browserReload);
  gulp.watch("./src/js/app.js", libsJs);
  gulp.watch("./src/js/main.js");
  gulp.watch("./src/**/*.js", browserReload);
  //var buildHtml = gulp.src("src/templates/**/*.html").pipe(gulp.dest("dist"));
  var buildHtml = gulp.src("src/*.html").pipe(gulp.dest("dist"));
  var buildCss = gulp.src("src/css/*.css").pipe(gulp.dest("dist/css"));
  var buildJs = gulp
    .src(["src/js/libs.min.js", "src/js/main.js"])
    .pipe(gulp.dest("dist/js"));
}

function clear(done) {
  del.sync(["dist/**/*"]);
  done();
}

function buildFile(done) {
  var buildHtml = gulp.src("src/**/*.html").pipe(gulp.dest("dist"));
  var buildCss = gulp
    .src("src/css/*.css")
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: "compressed",
      })
    )
    .on("erorr", console.error.bind(console))
    .pipe(gulp.dest("dist/css"));
  var buildJs = gulp
    .src(["src/js/libs.min.js", "src/js/main.js"])
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
  var buildImg = gulp.src("src/img/**/*.*").pipe(gulp.dest("dist/img"));
  var buildFonts = gulp.src("src/fonts/**/*.*").pipe(gulp.dest("dist/fonts"));
  var buildVideo = gulp.src("src/video/**/*.*").pipe(gulp.dest("dist/video"));
  var buildPdf = gulp.src("src/pdf/**/*.*").pipe(gulp.dest("dist/pdf"));
  done();
}

gulp.task(
  "watch",
  gulp.series(html, gulp.parallel(css, libsJs, js, watchFile, sync))
);
gulp.task("build", gulp.parallel(html, css, libsJs, js, clear, buildFile));
