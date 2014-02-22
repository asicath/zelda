var Monster = function() {
    var my = RandomWalker();

    my.entityType = 'monster';

    my.takeSwordHit = function(room) {
        room.removeAfterFrame.push(my);
        room.countToAddMonster = 60;
        room.addCount++;
        sound_kill.play();
    };

    return my;
};