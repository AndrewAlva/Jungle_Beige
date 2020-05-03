var Preloader = {
	intro: null,
	outro: null,
	transitioners: null,
	transitionDuration: 700,

	init: function() {
		this.intro = document.getElementById('preload_intro');
		this.outro = document.getElementById('preload_outro');

		this.transitioners = document.getElementsByClassName('page_transitioner');

		this.transitionListener();

		this.hideIntro();
	},

	showOutro: function(color) {
		var _this = this;

		if(color) _this.outro.classList.add(color);
		setTimeout(function(){
			_this.outro.classList.add('show');
		}, 50);
	},

	hideIntro: function() {
		this.intro.classList.add('hide');
	},

	transitionListener: function(){
		var _this = this;

		for (var i = 0; i < this.transitioners.length; i++) {
			this.transitioners[i].addEventListener("click", function(e){
				e.preventDefault();
				var _href = e.target.getAttribute("href");
				var _color = e.target.getAttribute("color");
				_this.showOutro(_color);

				setTimeout(function(){
					window.location.href = _href;
				}, _this.transitionDuration);

			});
		}
	}
}