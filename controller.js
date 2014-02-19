




$(document).on('keypress', function(e1, e2, e3) {

    var stepAmount = 3;

    switch (e1.which) {
        case 119: linkY-=stepAmount; linkI = 0; break;
        case 115: linkY+=stepAmount; linkI = 3; break;
        case  97: linkX-=stepAmount; linkI = 6; break;
        case 100: linkX+=stepAmount; linkI = 9; break;
    }

    linkStep = linkStep > 0 ? 0 : 1;

});

window.requestAnimFrame = ( function() {
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function (
            /* function */ callback,
            /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


loadSprites('outside.gif', function(sprites) {
    loadSprites('link.gif', function(linkSprites) {

        $.getJSON('ow07-06.js').done(function(room) {

            startDraw(room, sprites, linkSprites);


        }).fail(function(e1, e2, e3) {
                console.log( "error" );
            });
    });
});