module.exports = function () {

    $.gulp.task("watch", function () {
        $.gulp.watch("src/pug/**/*.pug", $.gulp.series("pug"));
        $.gulp.watch("src/assets/scss/**/*.scss", $.gulp.series("sass"));
        $.gulp.watch("src/assets/js/**/*.js", $.gulp.series("scripts"));
        $.gulp.watch("src/assets/img/**/*", $.gulp.series("imagemin"));
    });

};
