
var Directions = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right'
};

//public Walker(rect, string name, double seconds) : base(rect, name) {
var Walker = function() {
    var my = Mover();

    var speed; //this.speed = Walker.CalculateSpeed(256 * World.Factor, World.TicksPerSecond, seconds);
    var _facing = Directions.top;    // Direction  this._facing = Direction.Top;
    var moving = {
        top: false,
        bottom: false,
        left: false,
        right: false
    };

    var xAutoMove = 0;
    var yAutoMove = 0;
    var autoMoveSpeed = 0;
    var lastReleased = Directions.top;

    var _rectFootPrint; // Rectangle


    var executeFrame_parent = my.executeFrame;
    my.executeFrame = function(room) {
        executeFrame_parent(room);

        /* TODO AutoMove
        // Process automove clean up
        if (xAutoMove != 0) {
            xAutoMove -= xVelocityAuto;
        }
        if (yAutoMove != 0) {
            yAutoMove -= yVelocityAuto;
        }
        */

    };

    var attemptMove_parent = my.attemptMove;
    var attemptMove = function(room, rectNew, xChange, yChange) {

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

    my.xVelocity = function() {

        /* TODO AutoMove
        // Return the auto v
        if (xVelocityAuto != 0) {
            return xVelocityAuto;
        }

        // No xVelocity if yAutoMoving
        if (this.yAutoMove != 0) { return 0; }
        */

        // Process move normally
        switch (this.movingPriority) {
            case Direction.Left:
                this.facing = Direction.Left;
                return -speed;
            case Direction.Right:
                this.facing = Direction.Right;
                return speed;
        }
        return 0;
    };

    my.yVelocity = function() {

        /* TODO AutoMove
        // Return the auto v
        if (yVelocityAuto != 0) {
            return yVelocityAuto;
        }

        // No xVelocity if yAutoMoving
        if (this.xAutoMove != 0) { return 0; }
        */

        // Move normally
        switch (this.movingPriority) {
            case Direction.Top:
                this.facing = Direction.Top;
                return -speed;
            case Direction.Bottom:
                this.facing = Direction.Bottom;
                return speed;
        }
        return 0;
    };



    return my;
};

/*
static private int GuideSize = 8 * World.Factor;

static public int AbsMin(int a, int b) {
    if (Math.Abs(a) < Math.Abs(b)) {
        return a;
    }
    return b;
}

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

public void startMoving(Direction direction) {
    if (this.moving[direction]) {
        throw new Exception("Already moving " + direction.ToString());
    }
    this.moving[direction] = true;
    checkForAutoMove();
}

public void endMoving(Direction direction) {
    if (!this.moving[direction]) {
        throw new Exception("Not moving " + direction.ToString());
    }
    this.moving[direction] = false;
    lastReleased = direction;
    checkForAutoMove();
}

private int movingCount {
    get {
        int count = 0;
        if (this.moving[Direction.Top]) { count++; }
        if (this.moving[Direction.Bottom]) { count++; }
        if (this.moving[Direction.Left]) { count++; }
        if (this.moving[Direction.Right]) { count++; }
        return count;
    }
}

public void setAutoMove(int x, int y, int speed, Direction direction) {
    this.xAutoMove = x;
    this.yAutoMove = y;
    this.autoMoveSpeed = speed;
    this.facing = direction;
}

public void push(Direction direction, int distance, int speed) {
    int x = 0;
    int y = 0;
    switch (direction) {
        case Direction.Top:
            y = -distance;
            break;
        case Direction.Bottom:
            y = distance;
            break;
        case Direction.Left:
            x = -distance;
            break;
        case Direction.Right:
            x = distance;
            break;
    }

    this.setAutoMove(x, y, speed, this.facing);
}

protected void checkForAutoMove() {

    // Already auto moving, ignore
    if (xAutoMove != 0 || yAutoMove != 0) {
        return;
    }

    //Check for auto correction
    if (this.moving[Direction.Top] || this.moving[Direction.Bottom]) {

        // Determine direction of the automove
        int x = 0;
        if (this.moving[Direction.Left] || lastReleased == Direction.Left) {
            x = this.toLeftGuide;
        }
        else if (this.moving[Direction.Right] || lastReleased == Direction.Right) {
            x = this.toRightGuide;
        }
        else {
            x = this.xCorrect;
        }

        if (x != 0) {
            Direction direction = Direction.Right;
            if (x < 0) {direction = Direction.Left;}
            this.setAutoMove(x, 0, this.speed, direction);
        }
    }
    else if (this.moving[Direction.Left] || this.moving[Direction.Right]) {

        // Determine direction of the automove
        int y = 0;
        if (this.moving[Direction.Top] || lastReleased == Direction.Top) {
            y = this.toTopGuide;
        }
        else if (this.moving[Direction.Bottom] || lastReleased == Direction.Bottom) {
            y = this.toBottomGuide;
        }
        else {
            y = this.yCorrect;
        }

        if (y != 0) {
            Direction direction = Direction.Bottom;
            if (y < 0) {direction = Direction.Top;}
            this.setAutoMove(0, y, this.speed, direction);
        }
    }
}

public void endMoving() {
    this.moving[Direction.Top] = false;
    this.moving[Direction.Bottom] = false;
    this.moving[Direction.Left] = false;
    this.moving[Direction.Right] = false;
}



public Direction movingPriority {
    get {
        if (this.moving[Direction.Top]) {return Direction.Top;}
        if (this.moving[Direction.Bottom]) { return Direction.Bottom; }
        if (this.moving[Direction.Left]) { return Direction.Left; }
        if (this.moving[Direction.Right]) { return Direction.Right; }
        return Direction.None;
    }
}

#endregion


#region Velocity



protected int xVelocityAuto {
    get {
        if (xAutoMove != 0) {
            return AbsMin(this.xAutoMove, this.autoMoveSpeed * Math.Sign(xAutoMove));
        }
        return 0;
    }
}

protected int yVelocityAuto {
    get {
        if (yAutoMove != 0) {
            return AbsMin(this.yAutoMove, this.autoMoveSpeed * Math.Sign(yAutoMove));
        }
        return 0;
    }
}

#endregion


#region FindGuide

/// <summary>
/// The minimum amount to move for the entity to be on the guide line
/// </summary>
private int xCorrect {
    get {
        return Walker.AbsMin(toLeftGuide, toRightGuide);
    }
}
private int toLeftGuide {
    get {
        return -this.rect.X % Walker.GuideSize;
    }
}
private int toRightGuide {
    get {
        int v = this.toLeftGuide;
        if (v == 0) { return 0; }
        return Walker.GuideSize + v;
    }
}

/// <summary>
/// The minimum amount to move for the entity to be on the guide line
/// </summary>
private int yCorrect {
    get {
        return Walker.AbsMin(toTopGuide, toBottomGuide);
    }
}
private int toTopGuide {
    get {
        return -this.rect.Y % Walker.GuideSize;
    }
}
private int toBottomGuide {
    get {
        int v = this.toTopGuide;
        if (v == 0) {return 0;}
        return Walker.GuideSize + v;
    }
}

#endregion
*/