var Monster = function() {
    var my = RandomWalker();

    my.entityType = 'monster';
    my.life = 4;
    my.invincible = 0;

    my.takeDamage = function(amount, facing, room) {

        if (my.invincible > 0) return;

        my.life -= amount;

        my.invincible = 30;

        if (my.life <= 0) {
            death(room);
        }
        else {
            takeHit(facing);
        }

    };

    var death = function(room) {
        room.removeAfterFrame.push(my);
        room.countToAddMonster = 30;
        room.addCount += 2;
        playSoundKill();
    };

    var takeHit = function(facing) {
        my.push(facing, 128, 2);
    };

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);
        if (my.invincible > 0) {
            my.invincible--;
        }
    };

    return my;
};