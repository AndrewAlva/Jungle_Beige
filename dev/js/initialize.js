// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
var initCanvasSlideshow;

document.addEventListener('DOMContentLoaded', function() {
	deviceDetector.init();

	// Flag to determine if shader will be created or not
	// if (Page_Shader && deviceDetector.device == "desktop") {
	if (Page_Shader) {
		// Detect if user is in a screen smaller than tablet,
		// if so, don't create the shaders
		// 'cause shader isn't visible there
		if(window.innerWidth < 992 && Work_Index_Mobile){
			return false;
		}


		var spriteImages = document.querySelectorAll('.shader-img');
		var spriteImagesSrc = [];

		var _spriteSize = {
			width: 820,
			height: 1458
		};

		if (window.innerWidth < 992) {
			for (var i = 0; i < spriteImages.length; i++) {
				var img = spriteImages[i];
				spriteImagesSrc.push(img.getAttribute('mobsrc'));
			}

		} else {
			for (var i = 0; i < spriteImages.length; i++) {
				var img = spriteImages[i];
				spriteImagesSrc.push(img.getAttribute('src'));
			}

			_spriteSize.width = 1920;
			_spriteSize.height = 1080;
		}

		initCanvasSlideshow = new CanvasSlideshow({
			stageWidth: _spriteSize.width,
			stageHeight: _spriteSize.height,
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
	// if (document.getElementById('projectVideo01')) {
	// 	var ProjectVideo = new JBVideoPlayer({
	// 		containerID: 'projectVideo01'
	// 	});

	// 	ProjectVideo.init();
	// }

	// Detect if page has videos
	var projectVideos = document.getElementsByClassName('video-wrapper');
	var _videoTag = document.getElementsByTagName('video');

	if (projectVideos && projectVideos.length > 0 && _videoTag.length > 0){
		for (var i = 0; i < projectVideos.length; i++) {
			var _videoPlayer = new JBVideoPlayer({
				container: projectVideos[i]
			});

			_videoPlayer.init();

			// console.log('_videoPlayer init')
		}
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