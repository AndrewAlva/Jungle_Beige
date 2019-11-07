// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Do something
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    console.log("Page fully loaded.");
    console.log("Initialize.js");

    // Click interactions to move Home Slider
	$('.to-slide').on('click', function(event){
		console.log("to-slide clicked")
		event.preventDefault();
		var slide = $(this).data("slide");

		if(slide=="prev" || slide=="next"){
			if(slide=="prev") homeSlider.prev();
			else homeSlider.next();
		} else {
			homeSlider.goTo(slide);
		}
	});

	// Remove preloader
	animation.init();

}