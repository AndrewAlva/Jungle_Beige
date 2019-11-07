 var SideNav = {
	on: false,
	in_transition: false,
	mouseover: false,
	trigger_mouseover: false,
	element: document.getElementById('side-nav'),
	trigger_element: document.getElementById('sidenav-show-trigger'),
	links: document.getElementsByClassName('sidenav-elems'),
	linksIndex: 0,
	showLinks: function(){
		this.linksIndex = 0;
		this.in_transition = true;
		for (var i = 0; i < this.links.length; i++) {
			setTimeout(function(){
				SideNav.links[SideNav.linksIndex].classList.add('show');
				SideNav.linksIndex++;
				if (SideNav.linksIndex == SideNav.links.length) {
					SideNav.in_transition = false;
				}
			}, (i * 75));
		}
	},
	hideLinks: function(){
		this.linksIndex = 0;
		this.in_transition = true;
		for (var i = 0; i < this.links.length; i++) {
			SideNav.links[SideNav.linksIndex].classList.remove('show');
			SideNav.linksIndex++;
			if (SideNav.linksIndex == SideNav.links.length) {
				SideNav.in_transition = false;
			}
		}
	},

	show: function(){
		if (!this.in_transition) {
			this.on = true;
			this.element.classList.add('active');
			this.trigger_element.classList.add('show');
			this.showLinks()
		}
	},
	hide: function(){
		if (!this.in_transition) {
			this.on = false;
			this.element.classList.remove('active');
			this.trigger_element.classList.remove('show');
			this.hideLinks()
		}
	},
	toggle: function(){
		if (!this.on) {
			SideNav.show()
		} else {
			SideNav.hide()
		}
	},

	hoverListener: function(){
		this.element.onmouseenter = function(){
			SideNav.mouseover = true
		}
		this.trigger_element.onmouseenter = function(){
			SideNav.trigger_mouseover = true
		}
		this.element.onmouseleave = function(){
			SideNav.mouseover = false
		}
		this.trigger_element.onmouseleave = function(){
			SideNav.trigger_mouseover = false
		}
	},
	outClickListener: function(){
		window.addEventListener("click", function(){
			if (!SideNav.mouseover && !SideNav.trigger_mouseover && SideNav.on) {
				SideNav.hide()
			}
		})
	},

	triggerListener: function(){
		this.trigger_element.onclick = function(){
			SideNav.toggle()
		}
	},

	init: function(){
		this.hoverListener();
		this.outClickListener();
		this.triggerListener()
	}
}
SideNav.init();