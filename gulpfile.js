const gulp  = require('gulp');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Minify
gulp.task('min-css',function(){
    return gulp.src(['src/css/*.css'])
    .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('dest/css'))
      .pipe(browserSync.stream());
});

gulp.task('copyHtml',function(){
    return gulp.src(['src/*.html'])
        .pipe(gulp.dest('dest'));
})

gulp.task('copyRive',function(){
    return gulp.src(['src/js/*.rive'])
        .pipe(gulp.dest('dest/js'));
})


gulp.task('minify',function(){
    return gulp.src(['src/js/*.js'])
    .pipe(rename({
        suffix: '.min'
      }))
      .pipe(uglify().on('error', function(e){
        console.log(e)
     }))
      .pipe(gulp.dest('dest/js'))
      .pipe(browserSync.stream());
})

//Watch and Serve
gulp.task('serve',['min-css','minify','copyHtml','copyRive'],function(){
    browserSync.init({
        server: './dest'
    });
    gulp.watch(['src/css/*.css'],['min-css']);
    gulp.watch(['src/js/*.js'],['minify']);
    gulp.watch(['src/js/*.rive'],['copyRive']);
    gulp.watch(['src/*.html'],['copyHtml']).on('change',browserSync.reload);
});

//Default task
gulp.task('default',['serve']);
