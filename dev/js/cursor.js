var canvas, context;
var PI2 = Math.PI*2;

var maxWidth = window.innerWidth,   
    maxHeight = window.innerHeight;

var halfWidth = maxWidth /2,
    halfHeight = maxHeight / 2;

var mouse = {
    x: halfWidth,
    y: halfHeight
};

var Cursor = {
    x: mouse.x,
    y: mouse.y,
    cof: 0.1,
    dotRadius: 0,
    circleRadius: 0,
    dotMaxRadius: 3,
    circleMaxRadius: 30,
    wide: false,
    width: 1,
    color: "white",
    dotAlpha: 1,
    circleAlpha: 0,
    fill: true,

    init: function(){
        canvas = document.createElement('canvas');
        context = canvas.getContext('2d');
        document.body.appendChild(canvas);
        canvas.style.position = "fixed";
        window.addEventListener("resize", function() {
            onResizeWindow();
        }, false);

        window.addEventListener("mousemove", function(event) {
            mouse = {
                x: event.clientX,
                y: event.clientY
            };
        });

        var pageLinks = document.getElementsByTagName('a');
        var pageButtons = document.getElementsByTagName('button');
        var aboutNavs = document.getElementsByClassName('dot-slider');
        var specialWideners = document.getElementsByClassName('cursorWidener');
        var wideCursorTriggers = []

        for (var i = 0; i < pageLinks.length; i++) {
            wideCursorTriggers.push(pageLinks[i]);
        }
        for (var i = 0; i < pageButtons.length; i++) {
            wideCursorTriggers.push(pageButtons[i]);
        }
        for (var i = 0; i < aboutNavs.length; i++) {
            wideCursorTriggers.push(aboutNavs[i]);
        }
        for (var i = 0; i < specialWideners.length; i++) {
            wideCursorTriggers.push(specialWideners[i]);
        }

        for (var i = 0; i < wideCursorTriggers.length; i++) {
            wideCursorTriggers[i].addEventListener("mouseover", function(){
                Cursor.wide = true;
                canvas.classList.add('overlay');
            });

            wideCursorTriggers[i].addEventListener("mouseleave", function(){
                Cursor.wide = false;
                canvas.classList.remove('overlay');
            });
        }

        onResizeWindow();
    },

    update: function() {
        this.x += (mouse.x - this.x) * this.cof;
        this.y += (mouse.y - this.y) * this.cof;

        if(this.wide){
            Cursor.circleRadius += (Cursor.circleMaxRadius - Cursor.circleRadius) * Cursor.cof;
            if (Cursor.circleRadius >= Cursor.circleMaxRadius) Cursor.circleRadius = Cursor.circleMaxRadius;

            Cursor.dotRadius -= Cursor.dotRadius * Cursor.cof;
            if (Cursor.dotRadius <= 0) Cursor.dotRadius = 0;

            Cursor.circleAlpha += 0.05;
            Cursor.dotAlpha -= 0.05;
            if (Cursor.circleAlpha >= 1) Cursor.circleAlpha = 1;
            if (Cursor.dotAlpha <= 0) Cursor.dotAlpha = 0;

        } else {
            Cursor.dotRadius += (Cursor.dotMaxRadius - Cursor.dotRadius) * Cursor.cof;
            if (Cursor.dotRadius >= Cursor.dotMaxRadius) Cursor.dotRadius = Cursor.dotMaxRadius;

            Cursor.circleRadius -= Cursor.circleRadius * Cursor.cof;
            if (Cursor.circleRadius <= 0) Cursor.circleRadius = 0;

            Cursor.dotAlpha += 0.05;
            Cursor.circleAlpha -= 0.05;
            if (Cursor.dotAlpha >= 1) Cursor.dotAlpha = 1;
            if (Cursor.circleAlpha <= 0) Cursor.circleAlpha = 0;
        }

        this.draw();
    },
    draw: function() {
        // Small dot cursor
        context.beginPath();
        context.globalAlpha= this.dotAlpha;
        context.strokeStyle= this.color;
        context.fillStyle= this.color;
        context.lineWidth= this.width;
        context.arc(this.x, this.y, this.dotRadius, 0, PI2, false);
        context.stroke();
        context.fill();
        context.closePath();

        // Big circle cursor
        context.beginPath();
        context.globalAlpha= this.circleAlpha;
        context.strokeStyle= this.color;
        context.lineWidth= this.width;
        context.arc(this.x, this.y, this.circleRadius, 0, PI2, false);
        context.stroke();
        context.closePath();
    },

    render: function(){
        context.clearRect(0, 0, maxWidth, maxHeight);
        Cursor.update();
    },
    animate: function(){
        requestAnimationFrame(Cursor.animate);
        Cursor.render();
    }
};


function onResizeWindow() {
    maxWidth = window.innerWidth;
    maxHeight = window.innerHeight;
    halfWidth = maxWidth /2;
    halfHeight = maxHeight / 2;
    canvas.width = maxWidth;
    canvas.height = maxHeight;
}