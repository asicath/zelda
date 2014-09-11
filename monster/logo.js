
var Logo = (function() {

    var my = {};

    var imgBlazing = new Image();
    imgBlazing.src = 'blazing.gif';

    var imgPixel = new Image();
    imgPixel.src = 'pixel.gif';

    var width = 63;
    var height = 63;

    // small offscreen canvas
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');


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
            var x = Math.floor((width - imgBlazing.width)/2) + 1;
            var y = 0 + 1;
            ctx.drawImage(imgBlazing, x, 0);
        })();

        // pixel
        (function () {
            if (imgPixel.width <= 0) return;
            var x = Math.floor((width - imgPixel.width)/2) + 1;
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


    my.drawFrame = function(ctxx, x, y, factor) {
        draw();

        ctxx.fillStyle = 'black';
        ctxx.fillRect(x, y, width * factor, height * factor);
        //ctxx.drawImage(canvas, x, y, width, height);

        ctxx.mozImageSmoothingEnabled = false;
        ctxx.webkitImageSmoothingEnabled = false;
        ctxx.msImageSmoothingEnabled = false;
        ctxx.imageSmoothingEnabled = false;
        ctxx.drawImage(canvas, 0, 0, width, height, x, y, width * factor, height * factor);
    };


    var Color = function () {

        var TrimPercent = function (percent) {
            while (percent > 1.0) { percent -= 1.0; }
            return percent;
        };

        var percentCache = {};

        var ByPercent = function (percent, full, a) {

            // trim it
            percent = TrimPercent(percent);

            // narrow down to just a handful of possible values
            var key = "K" + Math.floor(percent * 1000);

            // Try to pull from cache
            if (typeof percentCache[key] !== 'undefined') {
                return percentCache[key];
            }

            var max = 6;
            var total = full * max; // Max num of colors that can be generated

            // The number representing the color that will be returned
            var i = Math.round(total * percent);

            //var full = 170;
            var empty = 0;
            var between = 0; //parseInt(parseFloat(full) * percent);

            var r = empty;
            var g = empty;
            var b = empty;

            if (!a) {
                a = 1;
            }
            //var a = 1; // No alpha

            if (percent < 1.0 / max) {
                // #FF++00 = FF0000 -> FFFF00
                between = i - full * 0;
                r = full;
                g = between;
                b = empty;
            } else if (percent < 2.0 / max) {
                // #--FF00
                between = i - full * 1;
                r = full - between;
                g = full;
                b = empty;
            } else if (percent < 3.0 / max) {
                // #00FF++
                between = i - full * 2;
                r = empty;
                g = full;
                b = between;
            } else if (percent < 4.0 / max) {
                // #00--FF = 00FFFF -> 0000FF
                between = i - full * 3;
                r = empty;
                g = full - between;
                b = full;
            } else if (percent < 5.0 / max) {
                // #++00FF = 0000FF -> FF00FF
                between = i - full * 4;
                r = between;
                g = empty;
                b = full;
            } else if (percent <= 6.0 / max) {
                // #FF00-- = FF00FF -> FF0000
                between = i - full * 5;
                r = full;
                g = empty;
                b = full - between;
            }

            // create the color
            var color = 'rgba(' + r + ',' + g + ',' + b + ', ' + a + ')';

            percentCache[key] = color;

            return color;

        };

        var ByNumber = function (number, max, full, alpha) {
            while (number > max) { number -= max; }
            return ByPercent(number / max, full, alpha);
        };

        return {
            ByNumber: ByNumber
        };

    } ();


    return my;

})();