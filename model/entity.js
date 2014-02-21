


var Entity = function() {

    var my = {
        palette: null,
        sprites: null,
        spriteIndex: 0,
        rect: null
    };

    my.executeFrame = function(room) {

    };

    my.afterFrame = function(room) {

    };

    my.getSprite = function() {
        return my.sprites[my.spriteIndex];
    };

    my.getPalette = function() {
        return my.palette;
    };


    return my;
};