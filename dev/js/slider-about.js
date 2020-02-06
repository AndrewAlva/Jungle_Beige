var AboutSlider = {
	paragraphsWrap: undefined,
	dotsWrap: undefined,
	slides: 0,
	index: 0,
	timerObj: null,
	timerInterval: 10000, //in miliseconds

	init: function(){
		this.getElements();
		this.addEventListeners();

		this.goTo(0);
	},

	getElements: function(){
		this.paragraphsWrap = document.getElementById('paragraphs-wrap');
		this.dotsWrap = document.getElementById('about-slider-dots');
		this.slides = this.paragraphsWrap.children.length;
	},

	goTo: function(index){
		this.timerStop();
		for (var i = 0; i < this.slides; i++) {
			this.paragraphsWrap.children[i].classList.remove('show');
			this.dotsWrap.children[i].classList.remove('active');
			this.dotsWrap.children[i].children[0].children[0].classList.remove('animate');
		}
		this.paragraphsWrap.children[index].classList.add('show');
		this.dotsWrap.children[index].classList.add('active');
		this.dotsWrap.children[index].children[0].children[0].classList.add('animate');

		this.index = index;
		this.timerStart();
	},
	next: function(){
		var _newIndex = parseInt(this.index) + 1;
		if (_newIndex >= this.slides) _newIndex = 0;

		this.goTo(_newIndex);
	},
	back: function(){
		var _newIndex = this.index - 1;
		if (_newIndex < 0) _newIndex = this.slides - 1;
		
		this.goTo(_newIndex);
		this.index = _newIndex;
	},

	addEventListeners: function(){
		this.dotsNavListener();

		// Scroll detection disabled to be replaced by auto pagination
		// this.scrollListener();
		// this.scrollMobileListener();
	},

	dotsNavListener: function(){
		var _this = this;
		for (var i = 0; i < this.slides; i++) {
			_this.dotsWrap.children[i].addEventListener('click', function(e){
				var _index = e.target.getAttribute("data-p-index");
				_this.goTo(_index);
			})
		}
	},

	scrollListener: function(){
		window.addEventListener('wheel', throttle(function(e){
			// console.log('user wheeling: ' + e.deltaY);
			AboutSlider.scrollNavigation(e.deltaY)
		}, 1500));
	},

	scrollMobileListener: function(){
		var _touchStartY;
		var _touchEndY;
		window.addEventListener('touchstart', throttle(function(e){
			// console.log('touchstart')
			_touchStartY = e.touches[0].clientY
		}, 1000));
		window.addEventListener('touchend', throttle(function(e){
			// console.log('touchend')
			_touchEndY = e.changedTouches[0].clientY;
			var _distance = _touchStartY - _touchEndY;

			AboutSlider.scrollNavigation(_distance);
		}, 1000));
	},

	scrollNavigation: function(deltaY){
		if (deltaY > 0) {
			AboutSlider.next();
		} else if (deltaY < 0){
			AboutSlider.back();
		}
	},

	timerStart: function(){
		var _this = this;

		this.timerObj = setInterval(function(){
			_this.next();
		}, this.timerInterval);
	},

	timerStop: function(){
		clearInterval(this.timerObj);
	}

}

if (document.getElementById('paragraphs-wrap')) {
	AboutSlider.init();
}





