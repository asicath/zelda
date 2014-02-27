
var Directions = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right'
};

var Walker = function(my) {
    my = Mover(my);

    // the top speed of the walker
    my.speed = 0;

    my.velocity = {
        x: 0,
        y: 0
    };

    my.canMove = true;

    // the current direction that the entity is attempting to move
    var walkingDirection = null;

    my.setWalkingDirection = function(direction) {
        // no need to double set
        if (direction == walkingDirection) return;

        // set the new direction
        walkingDirection = direction;

        // if the new direction isn't null, then check to see to make sure we stay on the lines
        if (direction) {
            needsGuideAutoMoveCheck = true;
        }
    };


    // The default footprint is 16x16
    my.footPrint = new Rect(0, 0, 16, 16);

    // footprint must have current position applied to be useful
    var getFootPrint = function(rect) {
        return new Rect(rect.x, rect.y + my.footPrint.y, my.footPrint.width, my.footPrint.height);
    };


    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        // currently does nothing
        executeFrame_parent(room);

        // find a new velocity based on walking direction and automove
        determineVelocity(room);

        // Do something
        processVelocity(room);

        // swap the step if actually moving
        if (my.canMove && hasVelocity()) {
            swapStep();
        }

    };

    var hasVelocity = function() {
        return my.velocity.x != 0 || my.velocity.y != 0;
    };

    var processVelocity = function(room) {

        if (my.velocity.x != 0 || my.velocity.y != 0) {

            // Get the old position
            var rectOld = my.rect;

            // Calculate the new position based on velocity.
            var rectNew = new Rect(rectOld.x + my.velocity.x, rectOld.y + my.velocity.y, rectOld.width, rectOld.height);

            //this.checkForEdgeEvent(
            my.attemptMove(room, rectNew);
        }
    };


    // the current direction that the entity is actually moving
    // walkers can only be moving on one axis at once
    var getVelocityDirection = function() {
        if (my.velocity.x < 0) {return Directions.left;}
        if (my.velocity.x > 0) {return Directions.right;}
        if (my.velocity.y < 0) {return Directions.top;}
        if (my.velocity.y > 0) {return Directions.bottom;}
    };

    var attemptMove_parent = my.attemptMove;
    my.attemptMove = function(room, rectNew) {

        // Get the new foot print to check for wall intersection
        var footPrint = getFootPrint(rectNew);

        // Check for wall intersection
        var wall = room.intersectsWall(footPrint);
        if (wall) {
            my.onWallEvent(room, wall, rectNew);
            return;
        }

        // no problems, complete move
        attemptMove_parent(room, rectNew);
    };

    my.onWallEvent = function(room, wall, rectNew) {

        // stop short
        switch(getVelocityDirection()) {
            case Directions.top:
                // hit wall from the bottom
                rectNew.y = wall.y + 16 - my.footPrint.y;
                break;
            case Directions.bottom:
                rectNew.y = wall.y - my.rect.height;
                break;
            case Directions.left:
                rectNew.x = wall.x + 16 - my.footPrint.x;
                break;
            case Directions.right:
                rectNew.x = wall.x - my.rect.width;
                break;
        }

        automove = null;

        // attempt again
        my.attemptMove(room, rectNew);
    };

    // override edge event
    my.onEdgeEvent = function(room) {
        automove = null;
    };




    var sign = function(number) {
        return number && number / Math.abs(number);
    };

    var determineVelocity = function(room) {

        if (!automove && needsGuideAutoMoveCheck) {
            checkForAutoMove(room);
            needsGuideAutoMoveCheck = false;
        }

        if (automove) {

            // clean up if we are close enough
            if (Math.abs(automove.y) < 0.01 && Math.abs(automove.x) < 0.01) {
                my.rect = automove.final;
                automove = null;
            }
            else {
                determineVelocityFromAutomove();
                return;
            }

        }

        // Process move normally
        determineVelocityFromMoving();
    };

    var determineVelocityFromAutomove = function() {
        my.setFacing(automove.facing);

        my.velocity.x = absMin(automove.x, automove.speed * sign(automove.x));
        my.velocity.y = absMin(automove.y, automove.speed * sign(automove.y));

        if (automove.x != 0) {
            automove.x -= my.velocity.x;
        }
        if (automove.y != 0) {
            automove.y -= my.velocity.y;
        }
    };

    var determineVelocityFromMoving = function() {

        my.velocity.x = 0;
        my.velocity.y = 0;

        if (!my.canMove) {return;}

        switch (walkingDirection) {
            case Directions.left:
                my.setFacing(Directions.left);
                my.velocity.x = -my.speed;
                break;
            case Directions.right:
                my.setFacing(Directions.right);
                my.velocity.x = my.speed;
                break;
            case Directions.top:
                my.setFacing(Directions.top);
                my.velocity.y = -my.speed;
                break;
            case Directions.bottom:
                my.setFacing(Directions.bottom);
                my.velocity.y = my.speed;
                break;
        }
    };


    // ******* Facing and sprites *******
    // **********************************

    // the direction the entity is facing, all walkers face one of four directions
    my.facing = Directions.top;

    my.facingSpriteBaseIndex = null;
    my.step = 0;

    my.setFacing = function(direction) {

        my.facing = direction;

        // change sprite
        switch (direction) {
            case Directions.top:
                my.spriteIndex = my.facingSpriteBaseIndex[0];
                break;
            case Directions.bottom:
                my.spriteIndex = my.facingSpriteBaseIndex[1];
                break;
            case Directions.left:
                my.spriteIndex = my.facingSpriteBaseIndex[2];
                break;
            case Directions.right:
                my.spriteIndex = my.facingSpriteBaseIndex[3];
                break;
        }
    };

    my.getSprite = function() {
        return my.sprites[my.spriteIndex + my.step];
    };

    var swapStepCount = 0;
    my.stepChange = 6;

    my.resetStep = function() {
        swapStepCount = 0;
        my.step = 0;
    };

    var swapStep = function() {
        if (swapStepCount++ % my.stepChange == 0) {
            my.step  = my.step  > 0 ? 0 : 1;
        }
    };




    // ******* Auto move *******
    // *************************

    var GuideSize = 8;

    // if the entity is currently engaged in an automove, the details of the automove are stored here
    var automove = null;

    // determines if the entity needs to check for an automove
    var needsGuideAutoMoveCheck = false;

    var checkForAutoMove = function(room) {

        // Already auto moving, ignore
        if (automove) { return; }

        // Check for auto correction
        if (walkingDirection == Directions.top || walkingDirection == Directions.bottom) {

            // The minimum amount to move for the entity to be on the guide line
            var toLeftGuide = my.rect.x % GuideSize;
            if (toLeftGuide == 0) {
                // no correction needed
                return;
            }

            var toRightGuide = GuideSize - toLeftGuide;

            // check to make sure it is valid
            var rectLeft = new Rect(Math.round(my.rect.x - toLeftGuide), my.rect.y, my.rect.width, my.rect.height);
            var rectRight = new Rect(Math.round(my.rect.x + toRightGuide), my.rect.y, my.rect.width, my.rect.height);

            var intersectsLeft = room.intersectsWall(getFootPrint(rectLeft));
            var intersectsRight = room.intersectsWall(getFootPrint(rectRight));

            var goLeft = false;

            // determine if either direction is invalid
            if (intersectsLeft) {
                goLeft = false;
            }
            else if (intersectsRight) {
                goLeft = true;
            }
            else {
                // both are valid, favor lesser movement amount
                goLeft = toLeftGuide <= 4;
            }

            if (goLeft) {
                // move left to guideline
                setAutoMove(-toLeftGuide, 0, my.speed, Directions.left, rectLeft);
            }
            else {
                // move right to guideline
                setAutoMove(toRightGuide, 0, my.speed, Directions.right, rectRight);
            }

        }
        else if (walkingDirection == Directions.left || walkingDirection == Directions.right) {

            // The minimum amount to move for the entity to be on the guide line
            var toTopGuide = my.rect.y % GuideSize;
            if (toTopGuide == 0) {
                // no correction needed
                return;
            }

            var toBottomGuide = GuideSize - toTopGuide;

            var rectTop = new Rect(my.rect.x, Math.round(my.rect.y - toTopGuide), my.rect.width, my.rect.height);
            var rectBottom = new Rect(my.rect.x, Math.round(my.rect.y + toBottomGuide), my.rect.width, my.rect.height);

            var intersectsTop = room.intersectsWall(getFootPrint(rectTop));
            var intersectsBottom = room.intersectsWall(getFootPrint(rectBottom));

            var goTop = false;

            // determine if either direction is invalid
            if (intersectsTop) {
                goTop = false;
            }
            else if (intersectsBottom) {
                goTop = true;
            }
            else {
                // both are valid, favor lesser movement amount
                goTop = toTopGuide <= 4;
            }

            //finalize one way or the other
            if (goTop) {
                // move up to guideline
                setAutoMove(0, -toTopGuide, my.speed, Directions.top, rectTop);
            }
            else {
                // move down to guideline
                setAutoMove(0, toBottomGuide, my.speed, Directions.bottom, rectBottom);
            }


        }
    };

    var absMin = function(a, b) {
        if (Math.abs(a) < Math.abs(b)) {
            return a;
        }
        return b;
    };

    var setAutoMove = function(x, y, speed, facing, final) {
        automove = {
            x: x,
            y: y,
            speed: speed,
            facing: facing,
            final: final || new Rect(my.rect.x + x, my.rect.y + y, my.rect.width, my.rect.height)
        };
    };

    my.push = function(direction, distance, speed) {
        var x = 0;
        var y = 0;
        switch (direction) {
            case Directions.top:
                y = -distance;
                break;
            case Directions.bottom:
                y = distance;
                break;
            case Directions.left:
                x = -distance;
                break;
            case Directions.right:
                x = distance;
                break;
        }

        setAutoMove(x, y, speed, my.facing, null);
    };


    return my;
};
