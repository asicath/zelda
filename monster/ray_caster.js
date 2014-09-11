var RayCaster = function() {
    var my = Entity();

    Mortal(my);

    my.entityType = 'monster';
    my.life = 8;
    my.getFootPrint().setSize(32, 32);

    var moveFrame = 0;
    var maxMoveFrame = 60 * 6000;
    var moveRadius = 60;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function() {

        executeFrame_parent();

        if (!my.center) {
            my.center = {
                x:my.position.x,
                y:my.position.y
            };
        }

        var angle = ((moveFrame++ % maxMoveFrame) / maxMoveFrame) * Math.PI * 2;
        my.position.x = Math.cos(angle) * moveRadius + my.center.x;
        my.position.y = Math.sin(angle) * moveRadius + my.center.y;


        // check for intersection with player
        var a = my.room.getIntersectingEntities(my, 'player', 'monsterHit');
        if (a) {
            for (var i = a.length-1; i >= 0; i--) {
                a[i].takeDamage(2, my);
            }
        }




    };

    my.drawEntity = function(ctx) {

        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        var radius = 16;

        nonaa.plotCircle(ctx, my.position.x + 8 , my.position.y + 8 , radius);
        if (my.center)
            nonaa.plotLine(ctx, my.center.x, my.center.y, my.position.x+8, my.position.y+8);


        /*

        ctx.beginPath();
        ctx.arc(my.position.x + 8, my.position.y + 8, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#000000";
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#940084';
        //ctx.stroke();

        ctx.lineWidth = 0.5;
        ctx.strokeStyle = '#d800cc';
        //ctx.stroke();

        if (my.center) {
            ctx.beginPath();
            ctx.moveTo(my.center.x, my.center.y);
            ctx.lineTo(my.position.x+8, my.position.y+8);
            ctx.lineWidth = 10;
            ctx.strokeStyle = '#000000';
            ctx.stroke();
        }
    */

    };

    return my;
};
