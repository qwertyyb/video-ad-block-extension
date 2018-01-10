var gulp = require('gulp')
var uglify = require('gulp-uglify')
var pump = require('pump')
var copy = require('copy')
var del = require('del')

gulp.task('minifyJs', cb => {
    pump([
        gulp.src('src/scripts/**/*.js'),
        uglify(),
        gulp.dest('dist/scripts/')
    ], cb)
})
gulp.task('copy', cb => {
    copy(['src/*.html', 'src/*.json', 'src/icons/*.png'], 'dist/', cb)
})
gulp.task('clean', cb => {
    del.sync('dist/*')
    cb()
})
gulp.task('build', ['clean', 'copy', 'minifyJs'], cb => cb())