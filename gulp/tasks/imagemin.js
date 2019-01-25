module.exports = function () {

    // $.gulp.task('img', function () {
    //     return $.gulp.src("src/assets/images/*.{png,jpg,gif}")
    //         .pipe($.gp.tingpng("API_KEY"))
    //         .pipe($.gulp.dest("build/assets/images/"))
    // });


    $.gulp.task('imagemin', function() {
        return $.gulp.src('src/assets/images/**/*')
            .pipe($.gp.imagemin())
            .pipe($.gulp.dest('build/assets/images/'))
    });


};