
var Directions = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right'
};

//public Walker(rect, string name, double seconds) : base(rect, name) {
var Walker = function() {
    var my = Mover();

    my.speed = 0; //this.speed = Walker.CalculateSpeed(256 * World.Factor, World.TicksPerSecond, seconds);

    my.facing = Directions.top;    // Direction  this._facing = Directions.Top;

    var needsCheckAutoMove = false;

    var moving = null; // the current direction that the entity is moving

    //var _rectFootPrint; // Rectangle

    var automove = null;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        determineVelocity(room);

        // Mover uses velocity
        executeFrame_parent(room);

    };

    var getFootPrint = function(rect) {
        return Rect(rect.x, rect.y + 8, 16, 8);
    };

    var attemptMove_parent = my.attemptMove;
    my.attemptMove = function(room, rectNew, xChange, yChange) {

        // Get the new foot print to check for wall intersection
        var footPrint = getFootPrint(rectNew);

        var wall = room.intersectsWall(footPrint);
        // Check for wall intersection
        if (wall) {
            // stop short
            switch(moving) {
                case Directions.top:
                    rectNew.y = wall.y + 8;
                    break;
                case Directions.bottom:
                    rectNew.y = wall.y - 16;
                    break;
                case Directions.left:
                    rectNew.x = wall.x + 16;
                    break;
                case Directions.right:
                    rectNew.x = wall.x - 16;
                    break;
            }

        }

        // no problems, complete move
        attemptMove_parent(room, rectNew, xChange, yChange);
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




    // ******* Auto move
    var GuideSize = 8; // 8 * World.Factor;

    // TODO Check to see if proposed automove position intersects with wall, take other route if so
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
            var rectLeft = Rect(Math.round(my.rect.x - toLeftGuide), my.rect.y, my.rect.width, my.rect.height);
            var rectRight = Rect(Math.round(my.rect.x + toRightGuide), my.rect.y, my.rect.width, my.rect.height);

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

            var rectTop = Rect(my.rect.x, Math.round(my.rect.y - toTopGuide), my.rect.width, my.rect.height);
            var rectBottom = Rect(my.rect.x, Math.round(my.rect.y + toBottomGuide), my.rect.width, my.rect.height);

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

    var setAutoMove = function(x, y, speed, direction, final) {
        automove = {
            x: x,
            y: y,
            speed: speed,
            facing: direction,
            final: final
        };
    };


    return my;
};

/*

public Rectangle getRectFootPrint() {
    return getRectFootPrint(this.rect);
}

public Rectangle getRectFootPrint(Rectangle rectPos) {
    if (this._rectFootPrint == Rectangle.Empty) { return rectPos; }
    return new Rectangle(rectPos.X + this._rectFootPrint.X, rectPos.Y + this._rectFootPrint.Y, this._rectFootPrint.Width, this._rectFootPrint.Height);
}


private void OnWallEvent(Wall wall) {
    if (WallEvent != null) {
        WallEvent(wall);
    }
}


public void push(Direction direction, int distance, int speed) {
    int x = 0;
    int y = 0;
    switch (direction) {
        case Directions.Top:
            y = -distance;
            break;
        case Directions.Bottom:
            y = distance;
            break;
        case Directions.Left:
            x = -distance;
            break;
        case Directions.Right:
            x = distance;
            break;
    }

    this.setAutoMove(x, y, speed, this.facing);
}



*/