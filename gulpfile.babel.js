import gulp from "gulp"
import sass from "gulp-sass"
import pug from "gulp-pug"
import babel from "gulp-babel"
import concat from "gulp-concat"
import uglify from "gulp-uglify"
import plumber from "gulp-plumber"
import replace from "gulp-replace"

import postcss from "gulp-postcss"
import autoprefixer from "autoprefixer"
import zIndex from "postcss-zindex"
import pseudoelements from "postcss-pseudoelements"
import nthChild from "postcss-nth-child-fix"


import browserSync from 'browser-sync'
const server = browserSync.create()

const production = false

const sassOptionsDev = {
    includePaths:['node_modules'],
    sourceComments: true,
    outputStyle: 'expanded'
}

const sassOptionsProd = {
    includePaths:['node_modules'],
    outputStyle: 'compressed'
}

const postCssPlugins = [
    autoprefixer({
        // browsers:['last 3 versions']
    }),
    zIndex(),
    pseudoelements(),
    nthChild()
]

//Tarea para convertir el sass a css y adicional agrega los prefix para los navegadores.
gulp.task('stylesDev', ()=>{
    return gulp.src('./dev/scss/app.scss')
        .pipe(plumber())
        .pipe(sass(sassOptionsDev))
        .pipe(postcss(postCssPlugins))
        .pipe(gulp.dest('./public/css'))
        .pipe(server.stream())
})

gulp.task('stylesProd', ()=>{
    return gulp.src('./dev/scss/app.scss')
        .pipe(plumber())
        .pipe(sass(sassOptionsProd))
        .pipe(postcss(postCssPlugins))
        .pipe(concat("app.css"))
        .pipe(gulp.dest('./public/css'))
        .pipe(server.stream())
});

//Tarea para pug - los pasa a html
gulp.task('pug', ()=>{
	return gulp.src('./dev/assets/*.pug')
    .pipe(plumber())
	.pipe(pug({
		pretty:true
	}))
	.pipe(gulp.dest('./public/'))
})

//Tarea para pug minificado - los pasa a html
gulp.task('pug-min', ()=>{
    return gulp.src('./dev/assets/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(replace('.html', ''))
    .pipe(gulp.dest('./public/'))
})

//Tarea para compilar es6 para todos los navegadores, crea un solo script y ofusca el código.
gulp.task('babel', ()=>{
    return gulp.src(['./dev/js/initialize.js', './dev/js/*.js'])
    .pipe(plumber())
    .pipe(babel({
        presets:['env']
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js'))
})

//Tarea para compilar es6 para todos los navegadores, crea un solo script y ofusca el código.
gulp.task('babel-min', ()=>{
    return gulp.src(['./dev/js/initialize.js', './dev/js/*.js'])
    .pipe(plumber())
    .pipe(babel({
        presets:['env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
})

// Tarea para exportar imagenes de "dev" a "public"
gulp.task('images', function(){
  return gulp.src('./dev/assets/img/*.+(png|jpg|gif|svg|mp4)')
  .pipe(gulp.dest('./public/img'))
});

// Tarea para exportar imagenes de folders dentro de img de "dev" a "public"
gulp.task('subimages', function(){
  return gulp.src('./dev/assets/img/**/*.+(png|jpg|gif|svg|mp4)')
  .pipe(gulp.dest('./public/img'))
});

// Tarea para exportar fuentes de "dev" a "public"
gulp.task('fonts', function(){
  return gulp.src('./dev/assets/fonts/**')
  .pipe(gulp.dest('./public/fonts'))
});

// Tarea para exportar php en el "/root"
gulp.task('php', function(){
  return gulp.src('./dev/assets/*.php')
  .pipe(gulp.dest('./public'))
});

// Tarea para exportar favicons y 'share image' en el "/root" 
gulp.task('sharegraph', function(){
  return gulp.src('./dev/assets/*.+(png|ico|svg|xml|webmanifest)')
  .pipe(gulp.dest('./public'))
});


//Tarea para levantar un servidor local y un watch general
gulp.task('server', ()=>{
    console.log('running server');

	server.init({
		server: './public'
	})

    production
        ? gulp.watch('./dev/scss/**', gulp.series('stylesProd'))
        : gulp.watch('./dev/scss/**', gulp.series('stylesDev'))

    gulp.watch('./dev/assets/*.pug', gulp.series('pug')).on('change', server.reload)
    gulp.watch('./dev/assets/**/*.pug', gulp.series('pug')).on('change', server.reload)
    gulp.watch('./dev/js/*.js', gulp.series('babel')).on('change', server.reload)
    gulp.watch('./dev/assets/img/**', gulp.series('images'))
    gulp.watch('./dev/assets/img/**', gulp.series('subimages'))
    gulp.watch('./dev/assets/fonts/**', gulp.series('fonts'))
    gulp.watch('./dev/assets/*.php', gulp.series('php'))
})


// Tarea general para crear la carpeta "public" y levantar el servidor general con un watch activo
gulp.task('default', gulp.series('pug', 'stylesDev', 'babel', 'images', 'subimages', 'fonts', 'php', 'sharegraph', 'server') )


// Tarea para exportar los archivos minificados listos para subir a servidor
gulp.task('build', gulp.series('pug-min', 'stylesProd', 'babel-min', 'images', 'subimages', 'fonts', 'php', 'sharegraph') )

