module.exports = function () {
    console.log(1);
    $.gulp.task('uncss', function () {

        return $.gulp.src("build/assets/css/main.css")
            .pipe($.gp.uncss({

                html: ['assets/index.html']
            }))
                .pipe($.gulp.dest('build/assets/out/'));
            });


};
