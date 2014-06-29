window.requestAnimFrame = ( function() {
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// cycle initiating model frames events and view drawing
var animate = function() {

    // setup the next frame draw
    requestAnimFrame(animate);

    draw();

};

var canvas, ctx, drawFrameCount, timeoutFrameCount;

$(function() {
    canvas = document.getElementById('img');
    ctx = canvas.getContext('2d');

    drawFrameCount = FrameCounter();
    timeoutFrameCount = FrameCounter();


    gameFrame();
    animate();

});

var draw = function() {
    drawFrameCount.next();

    if (!needsDraw) return;
    needsDraw = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;


    ctx.font = "bold 50px Arial";

    ctx.fillStyle = "blue";
    ctx.fillText("animation", 20, 100);
    ctx.fillText(" " + Math.floor(1000 / drawFrameCount.average()), 300, 100);
    ctx.fillText(" " + drawFrameCount.average(), 400, 100);

    ctx.fillStyle = "red";
    ctx.fillText("setTimeout ", 20, 200);
    ctx.fillText(" " + Math.floor(1000 / timeoutFrameCount.average()), 300, 200);
    ctx.fillText(" " + drawFrameCount.average(), 400, 200);
};

var targetGameFrameTime = Math.floor(1000/60);
var frameTimeIndex = 0;
var needsDraw = false;
var frameTimes = (function() {
    var a = [];
    var count = 60;
    var total = targetGameFrameTime * 60;
    var leftOver = 1000 - total;
    var every = Math.floor(60 / leftOver);
    for (var i = 0; i < 60; i++) {
        a[i] = targetGameFrameTime;
        if (leftOver > 0 && i % every == 0) {
            //a[i]++;
            leftOver--;
        }
    }
    return a;
})();

var gameFrame = function() {
    needsDraw = true;
    setTimeout(gameFrame, frameTimes[frameTimeIndex]);
    frameTimeIndex = (frameTimeIndex + 1) % frameTimes.length;


    timeoutFrameCount.next();

};

var FrameCounter = function() {
    var a = [];
    for (var i = 0; i < 10; i++) {a[i] = null;}
    var n = 0;
    var avg = 0;

    var next = function() {
        var now = new Date();
        if (a[n]) {
            avg = (now - a[n]) / a.length;
        }
        a[n] = now;
        n = (n + 1) % a.length;
    };

    var average = function() {
        return avg;
    };


    return {
        next: next,
        average : average
    };
};
