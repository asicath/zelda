var Player = function() {
    var my = Entity();
    my = Mover(my);
    my = Actor(my);

    my.movementSources.push(new WalkControlled(my));
    my.movementSources.push(new Push(my));

    my.action = ThrustSword(my);

    my.playerId = 0;
    my.wallSensitive = true;
    my.entityType = 'player';
    my.rect = new Rect(144, 80, 16, 16);
    my.footPrint = new Rect(0, 8, 16, 8); // has a smaller foot print than the monsters
    my.facingSpriteBaseIndex = [0, 3, 6, 9];
    my.sprites = Sprites.link;
    my.palette = Palettes.LinkGreen;
    my.speed = 80/60; // can move 80 pixels in 1s or 60 frames

    my.setFacing(Directions.top);

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        if (my.invincible > 0) {
            my.invincible--;
        }

        executeFrame_parent(room);
    };

    my.getHitZone = function() {
        return new Rect(my.rect.x + 7, my.rect.y + 7, 2, 2);
    };


    my.life = 12;
    my.invincible = 0;
    my.takeDamage = function(amount, rect, room) {

        if (my.invincible > 0) return;

        //my.life -= amount;

        my.invincible = 30;

        if (my.life <= 0) {
            //death(room);
        }
        else {
            var direction = Directions.top;
            takeHit(direction);
        }

    };

    var takeHit = function(facing) {
        // slide 32 pixels in 46 frames
        my.push(Directions.top, 32, 32/8);
        sound_hit.play();
    };






    return my;
};