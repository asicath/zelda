

var DemoRoom = function(data) {
    var my = PlayerRoom(data);

    var addMonster = function() {

        // create the entity
        var e = RayCaster();

        //e.onDeath = onMonsterKill;

        // place it in a spawn cloud
        //e = SpawnCloud(e);

        e.position.x = 256/2;
        e.position.y = 176/2;

        // find a spot for it
        my.addEntity(e);
    };

    my.setFrameTimeout(1, addMonster);

    // container will overwrite
    my.onComplete = function() {};

    return my;
};
