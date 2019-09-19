// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Labels & input bottom line states
	// Add/remove class to ".sz-formfield" to change behavior of its own label and bottom line
		var ab_inputs = document.getElementsByClassName('jb-formfield');

		for (var i = ab_inputs.length - 1; i >= 0; i--) {
			ab_inputs[i].addEventListener('focusout', function(){
				if (this.value){
					this.classList.add('filled');
				} else {
					this.classList.remove('filled');
				}
			});
		} 
});