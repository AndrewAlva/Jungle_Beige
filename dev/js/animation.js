// window.animation = {
//     timeline: null,
//     init: function() {
//         this.timeline = new TimelineMax({
//             paused: true
//         })
//         // .to("#intro", .9, {
//         //     ease: Power3.easeOut,
//         //     opacity: 0,
//         //     display: "none",
//         // })
//         // .to(".preloader", .6, {
//         //     ease: Power3.easeOut,
//         //     height: "100%",
//         // })
//         .to(".preloader", .8, {
//             ease: Power2.easeOut,
//             opacity: 0,
//             display: "none",
//         })
//         .to(".translate-up", .4, {
//             ease: Power2.easeInOut,
//             y: 0,
//             opacity: 1,
//         })
//         .staggerTo(".tween-right", .4, {
//             ease: Power2.easeInOut,
//             x: 0,
//             opacity: 1,
//         },.02, .8)

//         .staggerTo(".project-up", .26, {
//             ease: Power2.easeOut,
//             y: 0,
//             opacity: .3,
//         },0.08)
//         .staggerTo(".bar", .4, {
//             ease: Power2.easeInOut,
//             width: "100%",
//         },0.14)
//         this.hide();
//         return false;
//     },
//     show: function() {
//         return this.timeline.reverse();
//     },
//     hide: function() {
//         return this.timeline.play();
//     }
// }



window.animation = {
    init: function() {
        var cascadeArray = document.getElementsByClassName('jb-cascade');
        for(var i = 0; i < cascadeArray.length; i++){
            cascadeArray[i].classList.add('animate')
        }
    }
}


