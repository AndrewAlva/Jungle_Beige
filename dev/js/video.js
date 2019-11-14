var videoContainer = document.getElementById("videoContainer");
var projectVideo = document.getElementById("projectVideo");
var isPlaying = false;

// show video
var buttonOpen = document.getElementById('open-video-btn');
buttonOpen.addEventListener("click", function() {
    videoContainer.classList.add('show-video');
    projectVideo.play();
    isPlaying=true;
});

// close video
var buttonClose = document.getElementById('close-video-btn');
buttonClose.addEventListener("click", function() {
    videoContainer.classList.remove('show-video');
    projectVideo.pause();
    isPlaying=false;
});
// play/pause video
projectVideo.addEventListener("click", function(){
    if(isPlaying==true){
        projectVideo.pause();
        isPlaying=false;
    }
    else{
        projectVideo.play();
        isPlaying=true;
    }
});
// video duration
var videoDuration, videoDurationContainers;

projectVideo.addEventListener("loadedmetadata", function(){
    videoDuration = projectVideo.duration;
    console.log("Video duration: " + videoDuration);

    videoDurationContainers = document.getElementsByClassName("videoDurationContainer");

    for (var i = 0; i < videoDurationContainers.length; i++) {
        videoDurationContainers[i].innerHTML = getTimeString(getMinutes(videoDuration), getSeconds(videoDuration));
    }
    console.log("get seconds: " + getSeconds(videoDuration));

});

// duración del video
function getMinutes(duration){
    var minutesResult = Math.floor(duration/60);
    if(minutesResult >= 10){
        return minutesResult
    }
    else{
        return "0" + minutesResult
    }
}
function getSeconds(duration){
    var secondsResult = Math.floor(duration%60);
    if(secondsResult >= 10){
        return secondsResult
    }
    else{
        return "0" + secondsResult
    }
}

function getTimeString(minutes, seconds){
    return minutes + "." + seconds;
}

// update seconds
var currentSeconds;
var currentSecondsContainer = document.getElementById("currentSecondsContainer");

projectVideo.addEventListener("timeupdate", function(){
    currentSeconds = projectVideo.currentTime;
    currentSecondsContainer.innerHTML = getTimeString(getMinutes(currentSeconds), getSeconds(currentSeconds));
});




// // nombre de las variables, tomar elementos por  nombre de id
// var videoContainer = document.getElementById("videoContainer");
// var projectVideo = document.getElementById("projectVideo");
// // define si se está reproduciendo(siempre hacer como pregunta)
// // ya que al inicio cuando se carga la página no se esta reproduciendo 
// // el video, entonces su valor es false
// var isPlaying = false;

// // aparece video
// // la variable se llama "buttonOpen" la cual roma el elmento del botón que debe abrir el video
// var buttonOpen = document.getElementById('open-video-btn');
// // a la variable se le va a agrergar un listener, en este casi "click"
// buttonOpen.addEventListener("click", function(event) {
//     // al click le decimos que tome la variable de "videoContainer" la cual tiene el objeto que queremos
//     // y le agregará una clase, en este caso "show-video" la cual ya le hemos puesto estilos en css
//     // todo lo que esté dentro de los {} serán las acciones a realizar
//     videoContainer.classList.add('show-video');
//     // en esta variable le ponemos un evento, que será play, para que reproduzca el video
//     projectVideo.play();
//     // ya que le seteamos que al momento de abrirse el video se reproduzca, entonces nuestra variable
//     // isPlaaying deja de ser false y paa a ser true, hay que definirle eso tambien
//     isPlaying=true;
// });

// // evento cerrar video 
// var buttonClose = document.getElementById('close-video-btn');
// buttonClose.addEventListener("click", function(event) {
//     videoContainer.classList.remove('show-video');
//     // igual que el caso anterior, solamente queremos que al momento de click del botón el video se detenga
//     projectVideo.pause();
//     // por lo tanto vuelve a ser false
//     isPlaying=false;
// });
// // evento para hacer click sobre el elemento que queremos, en este caso el video
// projectVideo.addEventListener("click", function(event){
//     // cuestionamientos, al momento en el que estamos sobre el video este ya deberia estarse reproduciendo
//     // por lo tanto es true, el video se esta reproduciendo, entonces es verdadero
//     if(isPlaying==true){
//         // ya que se esta reproduciendo al click solo queda que se detenga, por lo tanto un pause
//         // entonces el video ya no se reproduce y vuelve a ser false
//         projectVideo.pause();
//         isPlaying=false;
//     }
//     else{
//         // si el video no se está reproduciendo, entonces al click reproducelo
//         // isPlaying vuelve a ser tru ya que si lo está haciendo
//         projectVideo.play();
//         isPlaying=true;
//     }
// });
