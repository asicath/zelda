
$(function() {

    var canvas, ctx, width, height;

    canvas = document.getElementById('blazingpixel');
    ctx = canvas.getContext('2d');

    width = $(canvas).attr('width');
    height = $(canvas).attr('height');


    var squareSideLength = width * 0.01;
    var maxGloryRadius = width / 2 - 2;
    var minGloryRadius = squareSideLength / 2 - 2;

    var radiusOffset = Math.PI / 2;

    var drawGlory = function(total, increment, radius, color) {
        var n = 0;

        while (n < total) {
            var r = Math.PI * 2 * (n / total) + radiusOffset;
            var x = Math.cos(r) * radius + width/2;
            var y = Math.sin(r) * radius + height/2;
            ctx.beginPath();
            ctx.moveTo(width/2, height/2);
            ctx.lineTo(x, y);
            ctx.lineWidth=3;
            ctx.strokeStyle=color;
            ctx.stroke();
            n += increment;
        }
    };

    var getColor = function(r, g, b, a) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    };

    var total = 200;


    var draw = function() {

        total += 0.05;
        radiusOffset += Math.PI / 400;

        // setup the next frame draw
        requestAnimFrame( draw );

        ctx.clearRect(0, 0, width, height);

        // draw the glory
        (function() {
            //var total = 200;
            var max = 200;
            var numbers = [
                2,
                3,
                5,
                7,
                11,
                13,
                17
            ];
            //var numbers = [2, 3];
            for (var i = numbers.length - 1; i >= 0; i--) {

                var radius = (maxGloryRadius - minGloryRadius) * ((i + 1) / numbers.length) + minGloryRadius;
                //drawGlory(total, numbers[i], radius, Color.ByNumber(numbers.length - 1 - i, numbers.length, max));
                drawGlory(total, numbers[i], radius, Color.ByNumber(numbers.length - 1 - i, numbers.length, max, 0.2 + 0.8 * (i/numbers.length)));
            }

            //drawGlory(total, 3, maxGloryRadius * 0.8, Color.ByNumber(1, 3, max));
            //drawGlory(total, 5, maxGloryRadius, Color.ByNumber(2, 3, max));
        })();

        // draw the square
        (function() {
            var x = (width - squareSideLength) / 2;
            var y = (height - squareSideLength) / 2;

            // draw the square
            ctx.fillStyle="#ffffff";
            ctx.fillRect(x,y,squareSideLength,squareSideLength);
        })();
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

    draw();



    var init = function() {
        //var container = $(canvas).parent();
        //var c = $(canvas);

        // Set width and height
        //if (c.attr('width') != container.width()) { c.attr('width', container.width()); }
        //if (c.attr('height') != container.height()) { c.attr('height', container.height()); }
    };




});