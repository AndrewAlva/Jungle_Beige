// Hero Slider (Used in Home Page)
	// Update slides width for resizing cases
	$(window).resize(function() {
		projectSlider.getDeviceVersion();
		projectSlider.getSlideWidth();
		projectSlider.goTo(projectSlider.currentActiveSlide);
	});
	

	// Slider class (mold)
	function heroSlider(args){
		if(!args) args = {};

		// Flag triggers
		this.canSlide = true;

		// Slider values
		this.slidingDuration = args.slidingDuration || 700;
		this.slideWidth = null;
		this.slides = $('#home-hero-slider-not-mobile').find('.slide-container');
		this.totalSlides = this.slides.length;
		this.firstSlide = this.slides[0];
		this.secondSlide = (this.totalSlides > 1) ? this.slides[1] : this.slides[0];
		this.penultimateSlide = (this.totalSlides > 1) ? this.slides[(this.totalSlides - 2)] : this.slides[0];
		this.lastSlide = this.slides[(this.totalSlides - 1)];

		// Slider states
		this.currentActiveSlide = 0;
		this.currentDevice = "";

		// Nav states
		this.tabs = $('#home-hero-slider-not-mobile').find('.tabs');


		// Methods
		this.init = function(){
			this.getDeviceVersion();
			this.getDisplacement();
			this.insertClones();
			this.updateNavTabsState(0,0);
			this.updateSlidesState(0);
			this.goTo(0);
			// this.initialPosition();
			// $('#sliding-wrapper-not-mobile').addClass('smooth-sliding');
		}

		this.prev = function(){
			var index = this.currentActiveSlide - 1;
			if(index < 0){
				this.jumpPositionsTo(this.totalSlides);
				this.goTo(this.totalSlides - 1, true);
			} else {
				this.goTo(index);
			}
		}

		this.next = function(){
			var index = this.currentActiveSlide + 1;
			if(index >= this.totalSlides){
				this.jumpPositionsTo(-1);
				this.goTo(0, true);
			} else {
				this.goTo(index);
			}
		}

		this.goTo = function(index, animate){ // Something is missing
			var slideToDeactivate = this.currentActiveSlide;
			var slideToActivate = index;
			if (this.currentDevice == "mobile") {
				var slidesDisplace = this.getDisplacement() + (this.slideWidth * index);
			} else {
				var slidesDisplace = this.getDisplacement() + ((window.innerWidth * .551482) * index);
			}
			
			if(this.canSlide){
				this.canSlide = false;
				if(animate) $('#sliding-wrapper-not-mobile').addClass('smooth-sliding');

				$('#sliding-wrapper-not-mobile').css('transform', 'translateX(-' + slidesDisplace + 'px)');
				this.setStates(slideToActivate, slideToDeactivate);
				
				this.canSlide = true;
			}
		}

		// this.initialPosition = function(){
		// 	$('#sliding-wrapper-not-mobile').css('transform', 'translateX(-' + this.getDisplacement() + 'px)');
		// }

		this.jumpPositionsTo = function(index){
			$('#sliding-wrapper-not-mobile').removeClass('smooth-sliding');
			this.goTo(index);
		}

		this.getDisplacement = function(){ // Something is missing
			this.getSlideWidth();
			// var lateralDisplacement = (2 * this.slideWidth) - (($(window).width() - this.slideWidth) / 2);
			if (this.currentDevice == "mobile") {
				var lateralDisplacement = this.slideWidth * 2;
			} else {
				var lateralDisplacement = window.innerWidth * .878705;
			}

			return lateralDisplacement;
		}

		this.getSlideWidth = function(){
			this.slideWidth = $('#home-hero-slider-not-mobile').find('.slide-container').width();
		}


		this.insertClones = function(){
			this.insertClonesAtStart(this.penultimateSlide, this.lastSlide);
			this.insertClonesAtLast(this.firstSlide, this.secondSlide);
		}

		this.insertClonesAtStart = function(slideToCloneFirst, slideToCloneSecond){
			$(slideToCloneSecond).clone().prependTo('#sliding-wrapper-not-mobile');
			$(slideToCloneFirst).clone().prependTo('#sliding-wrapper-not-mobile');
		}

		this.insertClonesAtLast = function(slideToClonePenultimate, slideToCloneLast){
			$(slideToClonePenultimate).clone().appendTo('#sliding-wrapper-not-mobile');
			$(slideToCloneLast).clone().appendTo('#sliding-wrapper-not-mobile');
		}

		this.setStates = function(slideToActivate, slideToDeactivate){
			this.updateSlidesState(slideToActivate);
			this.updateNavTabsState(slideToDeactivate, slideToActivate);
			this.currentActiveSlide = slideToActivate;
		}

		// Assign Active/Inactive slides states
		this.updateSlidesState = function(slideToActive){
			$('#home-hero-slider-not-mobile').find('.slide-container').addClass('inactive-slide');
			$('#home-hero-slider-not-mobile').find('.slide-' + slideToActive).removeClass('inactive-slide');
		}

		// Assign Active/Inactive nav tabs states
		this.updateNavTabsState = function(activeTab, tabToActive){
			$(this.tabs[activeTab]).removeClass('active-tab');
			$(this.tabs[tabToActive]).addClass('active-tab');
		}

		this.getDeviceVersion = function(){
			if (window.innerWidth < 768) {
				this.currentDevice = "mobile"
			} else {
				this.currentDevice = "desktop"
			}
		}

		// Pull the trigger
		this.init();
	}

