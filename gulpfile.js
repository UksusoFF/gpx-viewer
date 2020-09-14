const autoprefixer = require('gulp-autoprefixer');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const gulp = require('gulp');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const tsify = require('tsify');

let path = {
    target: {
        dest: 'resources',
    },
    sources: {
        scripts: [
            'assets/scripts/index.ts',
        ],
        styles: [
            'assets/styles/bootstrap.scss',
        ],
    },
};

function appScripts() {
    return browserify(path.sources.scripts)
        .plugin(tsify)
        .transform('babelify')
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${path.target.dest}/scripts`));
}

function vendorStyles() {
    return gulp
        .src([
            'node_modules/leaflet/dist/leaflet.css',
            'node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.css',
            'node_modules/leaflet-geosearch/dist/geosearch.css',
        ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(`${path.target.dest}/styles`));
}

function appStyles() {
    return gulp
        .src(path.sources.styles)
        .pipe(sass({
            outputStyle: 'compressed',
        }))
        .pipe(autoprefixer())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(`${path.target.dest}/styles`));
}

function vendorFonts() {
    return gulp
        .src([
            'node_modules/@mdi/font/fonts/*'
        ])
        .pipe(gulp.dest(`${path.target.dest}/fonts`));
}

function vendorImages() {
    return gulp
        .src([
            'node_modules/leaflet/dist/images/*',
            'node_modules/leaflet.awesome-markers/dist/images/*'
        ])
        .pipe(gulp.dest(`${path.target.dest}/styles/images`));
}

gulp.task('watch', () => {
    gulp.watch([
        path.sources.scripts,
    ], {
        usePolling: true
    }, appScripts);
    gulp.watch([
        path.sources.styles,
    ], {
        usePolling: true
    }, appStyles);
});

gulp.task('default', gulp.series(appScripts, vendorStyles, appStyles, vendorFonts, vendorImages));
