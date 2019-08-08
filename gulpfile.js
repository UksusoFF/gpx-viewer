var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    sass = require('gulp-sass');

function buildScripts() {
    return gulp
        .src([
            'node_modules/jquery-colorbox/jquery.colorbox.js',
            'node_modules/bootstrap/js/dist/util.js',
            'node_modules/bootstrap/js/dist/collapse.js',
            'node_modules/bootstrap/js/dist/dropdown.js',
            'scripts/**/*.js',
        ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('build'));
}

function buildStyles() {
    let stream = merge();

    [
        'blue',
        'orange',
    ].forEach(function(name) {
        stream.add(gulp
            .src([
                'node_modules/jquery-colorbox/example3/colorbox.css',
                `styles/bootstrap_${name}.scss`,
            ])
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .pipe(concat(`styles_${name}.css`))
            .pipe(autoprefixer())
            .pipe(gulp.dest('build')))
    });

    return stream;
}

function buildFonts() {
    return gulp.src([
        'node_modules/font-awesome/fonts/fontawesome-webfont.*'])
        .pipe(gulp.dest('fonts'));
}

gulp.task('watch', () => {
    gulp.watch([
        'scripts/**/*.js',
    ], {
        usePolling: true
    }, buildScripts);
    gulp.watch([
        'styles/**/*.scss',
    ], {
        usePolling: true
    }, buildStyles);
});

gulp.task('default', gulp.series(buildScripts, buildStyles, buildFonts));
