var gulp = require('gulp')
var uglify = require('gulp-uglify')
var del = require('del')
var jsonfile = require('jsonfile')
var fs = require('fs')
var crx = require('gulp-crx-pack')
var uploadFile = require('./build/publish')
console.log(uploadFile)
var info = {}

// 压缩 src/scripts/ 目录下的js文件
gulp.task('minifyJs', _ => {
    return gulp.src('src/scripts/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'))
})

// 把除src/中除src/scripts/全部copy到dist/目录
gulp.task('copy', _ => {
    return gulp.src(['src/*.html', 'src/*.json', 'src/**/*.png'])
    .pipe(gulp.dest('dist/'))
})
// 清除dist/的文件
gulp.task('clean', done => {
    del.sync('upload/*')
    del.sync('dist/*')
    done()
})

// 自动更新manifest.json中的版本
gulp.task('updateVersion', done => {
    var file = 'src/manifest.json'
    var obj = jsonfile.readFileSync(file)
    // 更新manifest.json中的相关字段信息
    var curVersions = obj.version.split('.')
    obj.version = curVersions[0] + '.' + curVersions[1] + '.' + (parseInt(curVersions[2]) + 1)
    // 更新update_url字段，更新版本号
    var updateUrl = obj.update_url.split('?')[0] + '?v' + obj.version
    obj.update_url = updateUrl

    // 获取相关信息：
    info = {
        name: obj.name,
        version: obj.version,
        updateUrl: obj.update_url
    }
    // 写入文件
    jsonfile.writeFileSync(file, obj, {spaces: 4})
    done()
})

gulp.task('package', done => {
    var crxName = 'videoAdBlock-' + info.version + '.crx'
    var codebase = 'http://7xv7aw.com1.z0.glb.clouddn.com/adblock/' + crxName
    
    info.crxName = crxName
    info.crx = codebase

    return gulp.src('./dist/')
    .pipe(crx({
        privateKey: fs.readFileSync('./videoAdBlock.pem', 'utf8'),
        filename: crxName,
        codebase: codebase,
        updateXmlFilename: 'version.xml'
    }))
    .pipe(gulp.dest('./upload'))
})
// 上传version.xml和videoAdBlock.crx到七牛云
gulp.task('upload', done => {
    // 上传version.xml
    uploadFile('./upload/version.xml', 'adblock/version.xml')
    uploadFile('./upload/' + info.crxName, 'adblock/' + info.crxName)
    done()
})
gulp.task('build', gulp.series(
    gulp.parallel('updateVersion', 'clean'), 
    gulp.parallel('copy', 'minifyJs'),
    'package', 'upload', done => {
        console.log('打包完成\n', info)
        done()
    }))