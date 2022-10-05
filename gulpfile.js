let {src, dest} = require('gulp');
let {series, parallel} = require('gulp');
let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let autoprefixer = require('gulp-autoprefixer');
let rename = require('gulp-rename');
let del = require('del');

function cleanDist(cb) {
    return del('dist/*');
}

function minimizeCss(cb) {
    return src('src/*.css')
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest('dist'));
}

function minimizeJs(cb) {
    return src('src/*.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dist'));
}

function copyHtml(cb) {
    return src('src/*.html')
    .pipe(dest('dist'));
}

exports.default = series(cleanDist, parallel(minimizeCss, minimizeJs, copyHtml));

