var Preloader = {
	intro: null,
	outro: null,

    init: function() {
    	this.intro = document.getElementById('preload_intro');
		this.outro = document.getElementById('preload_outro');

		this.hideIntro();
    },

    showOutro: function() {
    	this.outro.classList.add('show');
    },

    hideIntro: function() {
    	this.intro.classList.add('hide');
    }
}