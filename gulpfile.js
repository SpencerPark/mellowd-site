const
    gulp = require('gulp'),
    del = require("del"),
    ts = require("gulp-typescript"),
    webpack = require("gulp-webpack"),
    loadWiki = require("./WikiLoader");

const tsProject = ts.createProject("tsconfig.json");
gulp.task("build", ["install assets", "compile wiki"], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(webpack(require('./webpack.config.js')(false)))
        .pipe(gulp.dest("dist/"));
});

gulp.task("install assets", function () {
    return gulp.src('assets/**/*')
        .pipe(gulp.dest('dist/public/'));
});

gulp.task("compile wiki", function () {
    return gulp.src('src/Wiki/pages/**/*.md')
        .pipe(loadWiki())
        .pipe(gulp.dest("dist/wiki/"));
});