const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const PROJECT_ROOT = __dirname;
const PROJECT_SOURCE = {
    'html': PROJECT_ROOT + '/',
    'scss': PROJECT_ROOT + '/private/scss/',
    'assets': PROJECT_ROOT + '/assets/',
    'ts': PROJECT_ROOT + '/private/ts/'
};
const DESTINATION_PATH = {
    'html': PROJECT_ROOT + '/dist/',
    'css': PROJECT_ROOT + '/dist/css/',
    'assets': PROJECT_ROOT + '/dist/assets/',
    'js': PROJECT_ROOT + '/dist/js/'
};
const PROJECT_PATTERNS = {
    'html': [
        PROJECT_SOURCE.html + '*.html'
    ],
    'scss': [
        PROJECT_SOURCE.scss + '**/*.scss',
        '!' + PROJECT_SOURCE.scss + '**/*.min.scss',
        '!' + PROJECT_SOURCE.scss + 'libs/*.scss'
    ],
    'assets': [
        PROJECT_SOURCE.assets + '**/*.*'
    ],
    'ts': [
        PROJECT_SOURCE.ts + '**/*.ts',
        '!' + PROJECT_SOURCE.ts + '**/*.min.ts',
        '!node_modules/**',
        PROJECT_SOURCE + '/gulpfile.ts'
    ]
};

gulp.task('html', () => {
    return gulp.src(PROJECT_PATTERNS.html)
        .pipe(gulp.dest(DESTINATION_PATH.html));
});

gulp.task('html:watch', () => {
    gulp.watch(PROJECT_PATTERNS.html, ['html']);
});

gulp.task('scss', () => {
    return gulp.src(PROJECT_PATTERNS.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed', includePaths: ['node_modules'] }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(DESTINATION_PATH.css));
});

gulp.task('scss:watch', () => {
    gulp.watch(PROJECT_PATTERNS.scss, ['scss']);
});

gulp.task('assets', () => {
    return gulp.src(PROJECT_PATTERNS.assets)
        .pipe(gulp.dest(DESTINATION_PATH.assets));
});

gulp.task('ts', () => {
    return gulp.src(PROJECT_PATTERNS.ts)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .on('error', () => {})
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DESTINATION_PATH.js));
});

gulp.task('ts:watch', () => {
    gulp.watch(PROJECT_PATTERNS.ts, ['ts']);
});

gulp.task('watch', ['html:watch', 'scss:watch', 'ts:watch']);

gulp.task('default', ['html', 'scss', 'assets', 'ts']);
