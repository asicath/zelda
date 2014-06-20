var DropBomb = function(actor) {
    var my = Action(actor);

    my.onActivate = function(room) {
        var bomb = LiveBomb(actor);
        bomb.position.x = actor.position.x;
        bomb.position.y = actor.position.y;
        room.addEntity(bomb);
        Sounds.bombDrop.play();
    };

    return my;
};