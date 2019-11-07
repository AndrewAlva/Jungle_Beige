// var snjHeaderNav = {
// 	container: document.getElementsByClassName('snj-header-nav')[0],

// 	mobileTrigger: document.getElementsByClassName('snj-header-nav__trigger')[0],
// 	isOpened: false,


// 	openMenu: function(){
// 		this.mobileTrigger.classList.add('active');
// 		this.container.classList.add('opened');
// 		this.isOpened = true
// 	},

// 	closeMenu: function(){
// 		this.mobileTrigger.classList.remove('active');
// 		this.container.classList.remove('opened');
// 		this.isOpened = false
// 	},

// 	addMobileTriggerListener: function(){
// 		var _this = this;
// 		this.mobileTrigger.addEventListener("click", function(){
// 			if (!_this.isOpened) {
// 				_this.openMenu()
// 			} else {
// 				_this.closeMenu()
// 			}
// 		})
// 	},

// 	setupListeners: function(){
// 		// this.addScrollListener();
// 		this.addMobileTriggerListener();
// 		// this.addLogoListener()
// 	},

// 	init: function(){
// 		this.setupListeners()
// 	}
// }