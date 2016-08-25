var gulp = require('gulp')
var runseq = require('run-sequence')
var shell = require('gulp-shell')
var sourcemaps = require('gulp-sourcemaps')
var ts = require('gulp-typescript')
var tsc = require('gulp-tsc')
var tslint = require('gulp-tslint')
var gulpFile = require('gulp-file')
var pacakge = require('./package')

var paths = {
  tscripts: {
    src: ['src/**/*.ts', 'testing/**/*.ts', 'package.json'],
    dest: 'build'
  }
}

gulp.task('default', ['lint', 'buildrun'])

// ** Running ** //

gulp.task('run', shell.task(['node build/app.js']))

gulp.task('buildrun', function (cb) {
  runseq('build', 'run', cb)
})

// ** Watching ** //

gulp.task('watch', function () {
  gulp.watch(paths.tscripts.src, ['compile:source', 'copy:package-config'])
})

gulp.task('watchrun', function () {
  gulp.watch(paths.tscripts.src, runseq('compile:source', 'copy:package-config', 'run'))
})

// ** Compilation ** //

gulp.task('build', ['compile:source', 'copy:package-config'])

gulp.task('compile:source', function (done) {
  var tsProject = ts.createProject('tsconfig.json', { rootDir: 'src', sourceMap: true, sortOutput: true })

  var tsResult = tsProject.src() // instead of gulp.src(...) 
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
  return tsResult.js.pipe(sourcemaps.write('.', {
    includeContent: false,
    sourceRoot: function (file) {
      var fileName = file.relative.replace(/\\/g, '/')
      var level = fileName.split('/').length
      var src = ''
      for (var index = 0; index < level; ++index)
        src += '../'
      return src + 'src/'
    }
  })).pipe(gulp.dest(paths.tscripts.dest))
})

gulp.task('copy:package-config', function (done) {
  delete pacakge['devDependencies']
  return gulpFile('package.json', JSON.stringify(pacakge, null, '\t')).pipe(gulp.dest(paths.tscripts.dest))
})
// ** Linting ** //
