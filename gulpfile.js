let gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript');

let path = {
    target: {
        dest: 'resources',
    },
    sources: {
        scripts: [
            'assets/scripts/**/*.ts',
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
        ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(`${path.target.dest}/scripts`));
}

function appScripts() {
    return gulp
        .src(path.sources.scripts)
        .pipe(sourcemaps.init())
        .pipe(typescript({
            target: 'es5',
            typeRoots: [
                'node_modules/@types/*'
            ],
            outFile: 'app.js',
            strict: true,
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${path.target.dest}/scripts`));
}

function vendorStyles() {
    return gulp
        .src([
            'node_modules/leaflet/dist/leaflet.css',
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
            'node_modules/leaflet/dist/images/*'
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
