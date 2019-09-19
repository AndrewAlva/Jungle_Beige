// var Preloader = {
//     timeline: null,
//     // necesito definir nulo para que se cargue
//     init: function() {
//         // this hace referencia al objeto que estamos trabajando(Preloader.timeline)
//         // init inicia la funcion
//         this.timeline = new TimelineMax({
//             paused: true
//         })
//         .from(".preloader", 0.75, {
//             ease: Power3.easeOut,
//             opacity: 0,
//             display: "none"
//         });
//         this.timeline.pause();
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