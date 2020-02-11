function TitleShifter(args){
	if(!args) args= {};

	var _self = this;

	// Flag
	this.canShift = true;

	this.shiftDuration = args.shiftDuration || 500;
	this.shifterTriggers = document.getElementsByClassName('shifting-bg-trigger');
	this.shiftingImgs = document.getElementsByClassName('shifting-bg');

	this.init = function(){
		this.addListeners();
	}

	this.addListeners = function(){
		for (var i = 0; i < this.shifterTriggers.length; i++) {
			this.shifterTriggers[i].addEventListener('mouseenter', function(e) {
				var _index = e.target.getAttribute("data-shift-id");
				_index = parseInt(_index);
				_index -= 1;

				_self.shift(_index);
			});
		}
	}

	this.shift = function(index){
		// hide all images
		for (var i = 0; i < this.shiftingImgs.length; i++) {
			this.shiftingImgs[i].classList.remove('show');
		}

		// show correct image
		this.shiftingImgs[index].classList.add('show');
	}
}