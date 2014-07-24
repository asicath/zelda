var DropBomb = function(actor, type) {
    var my = Action(actor);

    my.weaponIconIndex = 0;

    if (type == BigBomb) my.weaponIconIndex = 1;

    my.onActivate = function() {
        var bomb = type(actor);
        bomb.position.x = actor.position.x;
        bomb.position.y = actor.position.y;
        actor.room.addEntity(bomb);
        Sounds.bombDrop.play();
    };

    return my;
};
