let gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript'),
    tsify = require('tsify'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    babelify = require('browserify');

let path = {
    target: {
        dest: 'resources',
    },
    sources: {
        scripts: [
            'assets/scripts/src/**/*.ts',
        ],
        styles: [
            'assets/styles/bootstrap.scss',
        ],
    },
};

function vendorScripts() {
    return gulp
        .src([
            'node_modules/leaflet/dist/leaflet.js',
            'node_modules/leaflet-plugins/layer/tile/Yandex.js',
            'node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.js',
        ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(`${path.target.dest}/scripts`));
}

function ven() {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [
            'assets/scripts/src/index.ts',
        ],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .transform('babelify', {
            global: true,
            presets: [
                '@babel/preset-env'
            ]
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(`${path.target.dest}/scripts`));
}

function appScripts() {
    return gulp
        .src([
            'assets/scripts/src/index.ts'
        ])
        .pipe(sourcemaps.init())
        .pipe(typescript({
            target: 'es5',
            typeRoots: [
                './node_modules/@types/*',
                './assets/scripts/@types/*',
            ],
            //outFile: 'app.js',
            strict: true,
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${path.target.dest}/scripts`));
}

function vendorStyles() {
    return gulp
        .src([
            'node_modules/leaflet/dist/leaflet.css',
            'node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.css',
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
            'node_modules/font-awesome/fonts/fontawesome-webfont.*'
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

gulp.task('default', gulp.series(vendorScripts, appScripts, vendorStyles, appStyles, vendorFonts, vendorImages));
