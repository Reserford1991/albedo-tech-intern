var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var sourceMaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rigger = require('gulp-rigger');

var path = {
    build: {
        fonts: 'build/fonts',
        js: 'build/js/*.js',
        css: 'build/css/*.css',
        img: 'build/img/./',
        assets: 'build',
        htaccess: "./build/.htaccess"
    },
    dev: {
        sourceHtml: 'dev/pages/*.html',
        partialsHtml: 'dev/partials/*.html',
        destHtml: 'dev/',
        sass: 'dev/scss/**/*.scss',
        fonts: 'dev/fonts/*',
        js: 'dev/*.html',
        css: 'dev/css',
        img: 'dev/img/**/*.{png,jpg,gif,ico}',
        sourceMaps: 'maps',
        htaccess: "./dev/.htaccess"
    },
    devWatch: {
        css: 'dev/css',
        html: 'dev/*.html',
        js: 'dev/js/**/*.js'
    }
};

var autoprefixerOptions = {
    browsers: ['last 2 versions',
        '> 5%',
        'Firefox ESR']
};

var buildConfig = {
    dir: "./build",
    tunnel: true,
    host: 'localhost',
    port: 3000,
    logPrefix: "html-css-build"
};

var devConfig = {
    dir: "./dev",
    tunnel: true,
    host: 'localhost',
    port: 3001,
    logPrefix: "html-css-dev"
};

gulp.task('html:build', function () {
    gulp.src(path.dev.sourceHtml)
        .pipe(rigger())
        .pipe(gulp.dest(path.dev.destHtml))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('sass:dev', function () {
    return gulp.src(path.dev.sass)
        .pipe(sass())
        .pipe(sourceMaps.init())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourceMaps.write(path.dev.sourceMaps))
        .pipe(gulp.dest(path.dev.css))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('devBrowserSync', function () {
    browserSync.init({
        server: {
            baseDir: devConfig.dir
        }
    })
});



gulp.task('watch', ['sass:dev', 'html:build', 'devBrowserSync'], function () {
    gulp.watch(path.dev.sass, ['sass:dev']);
    gulp.watch(path.dev.sourceHtml, ['html:build']);
    gulp.watch(path.dev.partialsHtml, ['html:build']);
    gulp.watch(path.dev.htaccess, browserSync.reload);
    gulp.watch(path.devWatch.html, browserSync.reload);
    gulp.watch(path.devWatch.html, browserSync.reload);
    gulp.watch(path.devWatch.js, browserSync.reload);
});

// Tasks for build folder - production website

gulp.task('minify', function () {
    return gulp.src(path.dev.js)
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest(path.build.assets))
});

gulp.task('images', function () {
    return gulp.src([path.dev.img])
        .pipe(imagemin({progressive: true, optimizationLevel: 7, use: [pngquant()]}))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts', function () {
    return gulp.src(path.dev.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('buildBrowserSync', function () {
    browserSync.init({
        server: {
            baseDir: buildConfig.dir
        }
    })
});

gulp.task('moveHtaccess', function(){
    return gulp.src(path.dev.htaccess)
        .pipe(gulp.dest(path.build.htaccess))
});

gulp.task('build', ['minify', 'images', 'fonts', 'moveHtaccess', 'buildBrowserSync'], function () {
    gulp.watch(path.build.js, browserSync.reload);
    gulp.watch(path.build.css, browserSync.reload);
});






