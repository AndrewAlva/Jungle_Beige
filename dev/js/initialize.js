// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
var initCanvasSlideshow;

document.addEventListener('DOMContentLoaded', function() {
	deviceDetector.init();

	// Flag to determine if shader will be created or not
	if (Page_Shader && deviceDetector.device == "desktop") {
		var spriteImages = document.querySelectorAll('.shader-img');
		var spriteImagesSrc = [];

		for (var i = 0; i < spriteImages.length; i++) {
			var img = spriteImages[i];
			spriteImagesSrc.push(img.getAttribute('src'));
		}

		initCanvasSlideshow = new CanvasSlideshow({
			sprites: spriteImagesSrc,
			displacementImage: 'img/dmaps/clouds.jpg',
			autoPlay: true,
			autoPlaySpeed: [0.6, 1.3],
			displaceScale: [120, 60],
			wacky: false
		});

		// console.log("debounce shader trans 150, unlocked bg titleshift");
	}


    // Detect if page has video
	if (document.getElementById('videoContainer')) {
		var ProjectVideo = new JBVideoPlayer({
			containerID: 'videoContainer'
		});

		ProjectVideo.init();
	}


	// Detect if page has shifting titles
	var areShiftingTitles = document.getElementsByClassName('shifting-imgs-container')[0];
	if(areShiftingTitles && deviceDetector.device == "desktop"){
		var WorkShifter = new TitleShifter();
		WorkShifter.init();
	}
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    // console.log("Page fully loaded.");
    // console.log("Initialize.js");

	// Remove preloader
	Preloader.init();


    // Init request animation frame
    RAF.init();

    // Add cursor on desktop
    if (deviceDetector.device == "desktop" ) RAF.add(Cursor);

    // Click interactions to move Projects Slider
	$('.to-slide').on('click', function(event){
		// console.log("to-slide clicked")
		event.preventDefault();
		var slide = $(this).data("slide");

		if(slide=="prev") projectSlider.prev();
		else projectSlider.next();
	});

	animation.init();

}