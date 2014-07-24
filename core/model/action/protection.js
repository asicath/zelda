var Protection = function(actor) {
    var my = Action(actor);

    var frame = 0;
    var stage = 0;
    var circle = null;
    var sigil = [];
    var sound = null;
    my.weaponIconIndex = 4;

    my.executeFrame = function() {

        // waiting to start
        if (stage == 0) {

            if (my.activateIntent) {
                // start charging
                stage = 1;
                frame = 0;

                actor.canWalk = false;

                sound = Sounds.whiteMagic.play();

                sound.loop = true;
            }
            else {

            }

        }


        // Sigils
        if (stage == 1) {
            frame++;

            actor.canWalk = false;



            if (frame == 10) {
                // init sigil array
                sigil = [];

                sigil[0] = new Sigil();
                actor.room.addEntity(sigil[0]);
                sigil[0].position.x = actor.position.x;
                sigil[0].position.y = actor.position.y - 16;
            }

            if (frame == 20) {
                sigil[1] = new Sigil();
                actor.room.addEntity(sigil[1]);
                sigil[1].position.x = actor.position.x;
                sigil[1].position.y = actor.position.y + 16;
                sigil[1].icon.spriteIndex = 2;
            }

            if (frame == 30) {
                sigil[2] = new Sigil();
                actor.room.addEntity(sigil[2]);
                sigil[2].position.x = actor.position.x + 16;
                sigil[2].position.y = actor.position.y;
                sigil[2].icon.spriteIndex = 1;
            }

            if (frame == 40) {
                sigil[3] = new Sigil();
                actor.room.addEntity(sigil[3]);
                sigil[3].position.x = actor.position.x - 16;
                sigil[3].position.y = actor.position.y;
                sigil[3].icon.spriteIndex = 3;
            }

            if (!my.activateIntent) {
                stage = 3;
            }

            if (frame == 50) {
                addCircle();

                frame = 0;
                stage = 2;
            }



        }

        // charging
        if (stage == 2) {

            frame++;

            actor.canWalk = false;

            if (circle.icon.spriteIndex > 0 && frame % 1 == 0) {
                circle.icon.spriteIndex--;
            }
            else if (frame > 20 && sigil.length > 0) {
                //clearSigils();
            }

            if (!my.activateIntent) {


                stage = 3;
            }

        }

        // wait to release button
        if (stage == 3) {

            if (circle) removeCircle();

            if (sigil.length > 0) {
                clearSigils();
            }

            if (!my.activateIntent) {
                stage = 0;
                actor.canWalk = true;
                sound.pause();
            }
        }

        if (circle) {
            circle.position.x = actor.position.x - 8;
            circle.position.y = actor.position.y - 8;
        }

    };

    var clearSigils = function() {
        while (sigil.length > 0) {
            var s = sigil.pop();
            s.room.removeEntity(s);
        }
    };

    var addCircle = function() {
        // create the circle
        circle = new Circle();
        circle.icon.spriteIndex = 0;
        circle.icon.startFlashing();

        actor.room.addEntity(circle);

        // give it protection from fireballs
        var executeFrame_parent = circle.executeFrame;
        circle.executeFrame = function() {
            executeFrame_parent();

            var c = circle.room.getIntersectingEntities(circle, 'fireball', null);
            while (c && c.length > 0) {
                var fireball = c.pop();
                circle.room.removeEntity(fireball);
            }
        };



    };

    var removeCircle = function() {
        if (circle) {
            circle.room.removeEntity(circle);
            circle = null;
        }
    };


    return my;
};