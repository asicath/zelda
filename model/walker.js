
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
    var lastMoved = Directions.top;
    var moving = {
        top: false,
        bottom: false,
        left: false,
        right: false
    };

    //var _rectFootPrint; // Rectangle

    var automove = null;

    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {

        determineVelocity();

        // Mover uses velocity
        executeFrame_parent(room);

    };

    var attemptMove_parent = my.attemptMove;
    my.attemptMove = function(room, rectNew, xChange, yChange) {

        /* TODO AutoMove
        // Get the new foot print to check for wall intersection
        var rectFootPrint = getRectFootPrint(rectNew);

        // Check for wall intersection
        var list = room.getIntersectingEntities(rectFootPrint, Entity.EntityType.Wall);
        if (list.length != 0) {
            // change the target to be flush with the wall.
            OnWallEvent(list[0]);
            return; //Shouldn't need this
        }
        */

        // no problems, complete move
        attemptMove_parent(room, rectNew, xChange, yChange);
    };

    my.isMoving = function(direction) {
        return moving[direction];
    };

    // determine which way the entity is walking if any
    var getMovingPriority = function() {
        if (moving[Directions.top]) { return Directions.top; }
        if (moving[Directions.bottom]) { return Directions.bottom; }
        if (moving[Directions.left]) { return Directions.left; }
        if (moving[Directions.right]) { return Directions.right; }
        return null;
    };


    var sign = function(number) {
        return number && number / Math.abs(number);
    };

    var determineVelocity = function() {

        if (automove) {

            my.velocity.x = absMin(automove.x, automove.speed * sign(automove.x));
            my.velocity.y = absMin(automove.y, automove.speed * sign(automove.y));

            if (automove.x != 0) {
                automove.x -= my.velocity.x;
            }
            if (automove.y != 0) {
                automove.y -= my.velocity.y;
            }

            if (automove.y == 0 && automove.x == 0) {automove = null;}

            return;
        }

        // get the direction that we are moving
        var movingPriority = getMovingPriority();
        lastMoved = movingPriority || lastMoved;

        // Process move normally
        my.velocity.x = 0;
        my.velocity.y = 0;
        switch (movingPriority) {
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

    my.startMoving = function(direction) {
        console.log("start move: " + direction);
        if (moving[direction]) {
            console.log("Already moving " + direction);
            return;
        }
        moving[direction] = true;
        checkForAutoMove();
    };

    my.endMoving = function(direction) {
        console.log("end move: " + direction);
        if (!moving[direction]) {
            console.log("Not moving " + direction);
            return;
        }
        moving[direction] = false;
        checkForAutoMove();
    };


    // ******* Auto move
    var GuideSize = 8; // 8 * World.Factor;

    var checkForAutoMove = function() {

        // Already auto moving, ignore
        if (automove) { return; }

        // Check for auto correction
        if (moving[Directions.top] || moving[Directions.bottom]) {

            // The minimum amount to move for the entity to be on the guide line
            var toLeftGuide = my.rect.x % GuideSize;
            if (toLeftGuide == 0) {
                // no correction needed
            }
            if (toLeftGuide <= 4) {
                // move left to guideline
                setAutoMove(-toLeftGuide, 0, my.speed, Directions.left);
            }
            else {
                // move right to guideline
                var toRightGuide = GuideSize - toLeftGuide;
                setAutoMove(toRightGuide, 0, my.speed, Directions.right);
            }

        }
        else if (moving[Directions.left] || moving[Directions.right]) {

            // The minimum amount to move for the entity to be on the guide line
            var toTopGuide = my.rect.y % GuideSize;
            if (toTopGuide == 0) {
                // no correction needed
            }
            else if (toTopGuide <= 4) {
                // move up to guideline
                setAutoMove(0, -toTopGuide, my.speed, Directions.top);
            }
            else {
                // move down to guideline
                var toBottomGuide = GuideSize - toTopGuide;
                setAutoMove(0, toBottomGuide, my.speed, Directions.bottom);
            }

        }
    };

    var absMin = function(a, b) {
        if (Math.abs(a) < Math.abs(b)) {
            return a;
        }
        return b;
    };

    var setAutoMove = function(x, y, speed, direction) {
        automove = {
            x: x,
            y: y,
            speed: speed,
            facing: direction
        };
        this.facing = direction; //remove this eventually...
    };


    return my;
};

/*

static protected int CalculateSpeed(int pixels, double ticksPerSecond, double seconds) {
    double ticks = ticksPerSecond * seconds;
    double pixelsPerTick = (double)pixels / ticks;
    return (int)Math.Floor(pixelsPerTick);
}

public Rectangle getRectFootPrint() {
    return getRectFootPrint(this.rect);
}

public Rectangle getRectFootPrint(Rectangle rectPos) {
    if (this._rectFootPrint == Rectangle.Empty) { return rectPos; }
    return new Rectangle(rectPos.X + this._rectFootPrint.X, rectPos.Y + this._rectFootPrint.Y, this._rectFootPrint.Width, this._rectFootPrint.Height);
}




#region Facing

public delegate void FacingChangeEventHandler(Direction direction);
public event FacingChangeEventHandler FacingChangeEvent;

public Direction facing {
    get { return this._facing; }
    set {
        if (this._facing == value) {return;} // Ignore if already facing
        this._facing = value;
        OnFacingChange(this._facing);
    }
}

private void OnFacingChange(Direction direction) {
    if (FacingChangeEvent != null) {
        FacingChangeEvent(direction);
    }
}

#endregion


#region WallEvent

public delegate void WallEventHandler(Wall wall);
public event WallEventHandler WallEvent;

private void OnWallEvent(Wall wall) {
    if (WallEvent != null) {
        WallEvent(wall);
    }
}

#endregion


#region MovingControls



private int movingCount {
    get {
        int count = 0;
        if (this.moving[Directions.Top]) { count++; }
        if (this.moving[Directions.Bottom]) { count++; }
        if (this.moving[Directions.Left]) { count++; }
        if (this.moving[Directions.Right]) { count++; }
        return count;
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



public void endMoving() {
    this.moving[Directions.Top] = false;
    this.moving[Directions.Bottom] = false;
    this.moving[Directions.Left] = false;
    this.moving[Directions.Right] = false;
}





#endregion


#region Velocity





#endregion



*/