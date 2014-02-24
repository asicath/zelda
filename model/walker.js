
var Directions = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right'
};

var Walker = function() {
    var my = Mover();

    // the top speed of the walker
    my.speed = 0;

    // the direction the entity is facing, all walkers face one of four directions
    my.facing = Directions.top;

    // the current direction that the entity is attempting to moving
    var moving = null;

    // The default footprint is 16x16
    my.footPrint = new Rect(0, 0, 16, 16);

    // footprint must have current position applied to be useful
    var getFootPrint = function(rect) {
        return new Rect(rect.x, rect.y + my.footPrint.y, my.footPrint.width, my.footPrint.height);
    };


    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        determineVelocity(room);

        // Mover uses velocity
        executeFrame_parent(room);

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

        var wall = room.intersectsWall(footPrint);
        // Check for wall intersection
        if (wall) {

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
        }

        // no problems, complete move
        attemptMove_parent(room, rectNew);
    };

    my.onEdgeEvent = function(room) {
        automove = null;
    };

    my.setMoving = function(direction) {
        if (direction == moving) return; // no need to double set
        moving = direction;

        if (direction) {
            needsCheckAutoMove = true;
        }

    };


    var sign = function(number) {
        return number && number / Math.abs(number);
    };

    var determineVelocity = function(room) {

        if (!automove && needsCheckAutoMove) {
            checkForAutoMove(room);
            needsCheckAutoMove = false;
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
        switch (moving) {
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

    my.setFacing = function(direction) {
        my.facing = direction;
    };




    // ******* Auto move *******
    // *************************

    var GuideSize = 8;

    // if the entity is currently engaged in an automove, the details of the automove are stored here
    var automove = null;

    // determines if the entity needs to check for an automove
    var needsCheckAutoMove = false;

    var checkForAutoMove = function(room) {

        // Already auto moving, ignore
        if (automove) { return; }

        // Check for auto correction
        if (moving == Directions.top || moving == Directions.bottom) {

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
        else if (moving == Directions.left || moving == Directions.right) {

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
