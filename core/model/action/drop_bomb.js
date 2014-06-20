var DropBomb = function(actor, type) {
    var my = Action(actor);

    my.onActivate = function(room) {
        var bomb = type(actor);
        bomb.position.x = actor.position.x;
        bomb.position.y = actor.position.y;
        room.addEntity(bomb);
        Sounds.bombDrop.play();
    };

    return my;
};