
$(function() {

    var imgBlazing = new Image();
    imgBlazing.src = 'blazing.gif';

    var imgPixel = new Image();
    imgPixel.src = 'pixel.gif';

    var Main = function(canvas) {

        var ctx, width, height;


        ctx = canvas.getContext('2d');

        width = $(canvas).attr('width');
        height = $(canvas).attr('height');


        var squareSideLength = 1;
        var maxGloryRadius = width / 2;
        var minGloryRadius = squareSideLength / 2;

        var radiusOffset = Math.PI / 2;

        var drawGlory = function (total, increment, radius, color) {
            var n = 0;

            while (n < total) {
                var r = Math.PI * 2 * (n / total) + radiusOffset;
                var x = Math.cos(r) * radius + width / 2;
                var y = Math.sin(r) * radius + height / 2;
                ctx.beginPath();
                ctx.moveTo(width / 2, height / 2);
                ctx.lineTo(x, y);
                ctx.lineWidth = 1;
                ctx.strokeStyle = color;
                ctx.lineCap = 'round';
                ctx.stroke();
                n += increment;
            }
        };

        var getColor = function (r, g, b, a) {
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
        };

        var total = 221;


        var draw = function () {

            //total += 0.05;
            radiusOffset += Math.PI / 1200;



            ctx.clearRect(0, 0, width, height);

            // Blazing
            (function () {
                if (imgBlazing.width <= 0) return;
                var x = Math.floor((63 - imgBlazing.width)/2) + 1;
                var y = 0 + 1;
                ctx.drawImage(imgBlazing, x, 0);
            })();

            // pixel
            (function () {
                if (imgPixel.width <= 0) return;
                var x = Math.floor((63 - imgPixel.width)/2) + 1;
                var y = 63 - imgPixel.height + 1;
                ctx.drawImage(imgPixel, x, y);
            })();

            // draw the glory
            (function () {
                //var total = 200;
                var max = 255;
                var numbers = [
                    2,
                    3,
                    5,
                    7,
                    11,
                    13,
                    17
                ];

                var baseA = 0.05;

                //var numbers = [2, 3];
                for (var i = numbers.length - 1; i >= 0; i--) {
                    var radius = (maxGloryRadius - minGloryRadius) * ((i + 1) / numbers.length) + minGloryRadius;
                    drawGlory(total, numbers[i], radius, Color.ByNumber(numbers.length - 1 - i, numbers.length, max, baseA + (1-baseA) * (i / numbers.length)));
                }

            })();

            // draw the square
            (function () {
                var x = (width - squareSideLength) / 2;
                var y = (height - squareSideLength) / 2;

                // draw the square
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(x, y, squareSideLength, squareSideLength);
            })();
        };

        return {draw: draw};
    };





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


    var img = document.createElement('canvas');
    img.width = 63;
    img.height = 63;


    var main = Main(img);

    var canvas = document.getElementById('blazingpixel');
    var ctxx = canvas.getContext('2d');

    var draw = function() {
        // setup the next frame draw
        requestAnimFrame(draw);

        main.draw();

        //Upscaled via drawImage (canvas)
        ctxx.clearRect(0, 0, 500, 500);
        ctxx.mozImageSmoothingEnabled = false;
        ctxx.webkitImageSmoothingEnabled = false;
        ctxx.msImageSmoothingEnabled = false;
        ctxx.imageSmoothingEnabled = false;
        ctxx.drawImage(img, 0, 0, 63, 63, 0, 0, 500, 500);
    };

    draw();

});