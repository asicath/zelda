define(['jquery', 'arcade/logo'], function($, Logo) {

    return function() {

        var my = {};

        var virtualWidth = 342;
        var virtualHeight = 192;

        // Music
        var logoMusic = new Audio("music/aum_logo.mp3");
        logoMusic.addEventListener('ended', function(){
            my.onLogoEnd();
        });
        logoMusic.addEventListener('canplay', function(){
            logoMusic.play();
        });
        
        // setup end events
        var end = function() {
            logoMusic.pause();
            my.onLogoEnd();
        };
        $(document).on('keypress', end);
        $(document).on('click', end);

        // guaranteed one call per 16ms
        my.processFrame = function() {};

        // one call per animation call from window
        my.drawFrame = function(ctx) {
            var factor = 2;
            var w = 63 * factor;
            var h = 63 * factor;
            Logo.drawFrame(ctx, Math.floor((virtualWidth - w) / 2), Math.floor((virtualHeight - h) / 2), factor);
        };

        my.onLogoEnd = function() {
            // over written by the parent
        };

        return my;
    };
});