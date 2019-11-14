// nombre de las variables, tomar elementos por  nombre de id
var videoContainer = document.getElementById("videoContainer");
var projectVideo = document.getElementById("projectVideo");
// define si se está reproduciendo(siempre hacer como pregunta)
// ya que al inicio cuando se carga la página no se esta reproduciendo 
// el video, entonces su valor es false
var isPlaying = false;

// show video
// aparece video
// la variable se llama "buttonOpen" la cual roma el elmento del botón que debe abrir el video
var buttonOpen = document.getElementById('open-video-btn');
// a la variable se le va a agrergar un listener, en este casi "click"
buttonOpen.addEventListener("click", function() {
// al click le decimos que tome la variable de "videoContainer" la cual tiene el objeto que queremos
// y le agregará una clase, en este caso "show-video" la cual ya le hemos puesto estilos en css
// todo lo que esté dentro de los {} serán las acciones a realizar
    videoContainer.classList.add('show-video');
// en esta variable le ponemos un evento, que será play, para que reproduzca el video
    projectVideo.play();
// ya que le seteamos que al momento de abrirse el video se reproduzca, entonces nuestra variable
// isPlaaying deja de ser false y paa a ser true, hay que definirle eso tambien
    isPlaying=true;
});

// close video
var buttonClose = document.getElementById('close-video-btn');

buttonClose.addEventListener("click", function() {
    videoContainer.classList.remove('show-video');
// igual que el caso anterior, solamente queremos que al momento de click del botón el video se detenga
    projectVideo.pause();
// por lo tanto vuelve a ser false
    isPlaying=false;
});

// play/pause video
projectVideo.addEventListener("click", function(){
    if(isPlaying==true){
// ya que se esta reproduciendo al click solo queda que se detenga, por lo tanto un pause
// entonces el video ya no se reproduce y vuelve a ser false
        projectVideo.pause();
        isPlaying=false;
    }
    else{
// si el video no se está reproduciendo, entonces al click reproducelo
// isPlaying vuelve a ser tru ya que si lo está haciendo
        projectVideo.play();
        isPlaying=true;
    }
});

// video duration
// crear variables a las cuales se les asiganaran datos posteriormente
var videoDuration, videoDurationContainers;

// se crea una funcion con un listener, "loadmetadata" en este caso para que cargue la data del video completamente
projectVideo.addEventListener("loadedmetadata", function(){
    // se le asigna a nuestra variable video duration el valor de la duracion del video(project video) con .duration
    videoDuration = projectVideo.duration;
    console.log("Video duration: " + videoDuration);
// setear la variable videoDurationContainers a una clase
    videoDurationContainers = document.getElementsByClassName("videoDurationContainer");
// en este caso como son dos elementos los que tenemos por medio de un ciclo for los buscamos
    for (var i = 0; i < videoDurationContainers.length; i++) {
        videoDurationContainers[i].innerHTML = getTimeString(getMinutes(videoDuration), getSeconds(videoDuration));
    }
    console.log("get seconds: " + getSeconds(videoDuration));

});

// duración del video
// variabls para la duracion del video

function getMinutes(duration){
    // esta variable es para sacar los minutos del tiempo total del video
    // en este caso nuestra variable minutesResult será igual a redondear hacia abajo la duracion entre 60, que son los segundos de un minuto
    // esto es para tener el valor del video en segundos
    var minutesResult = Math.floor(duration/60);
    // este if es para setear que si el resultado es mayor o igual a 10 se mande el resultadp
    // sino lo es se deberá agregar un cero (00.02) para que quedé acorde al diseño
    if(minutesResult >= 10){
        return minutesResult
    }
    else{
        return "0" + minutesResult
    }
}
function getSeconds(duration){
    // de igual forma haremos esto con los segundos, la unica diferencia es la operación matematica, al usar % lo que haces es que usamos
    // los restantes de una divicion
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
