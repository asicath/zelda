var WalkControlled = function(mover) {
    var my = Walk(mover);

    var executeMove_parent = my.executeMove;
    my.executeMove = function(room) {
        checkInput(mover.playerInputIndex, room);
        executeMove_parent(room);
    };

    var moving = {
        top: false,
        bottom: false,
        left: false,
        right: false
    };

    // determine which way the entity is walking if any
    var getMovingPriority = function() {
        if (moving[Directions.top]) { return Directions.top; }
        if (moving[Directions.bottom]) { return Directions.bottom; }
        if (moving[Directions.left]) { return Directions.left; }
        if (moving[Directions.right]) { return Directions.right; }
        return null;
    };

    var startMoving = function(direction, room) {
        //console.log("start move: " + direction);
        if (moving[direction]) {
            console.log("Already moving " + direction);
            return;
        }
        moving[direction] = true;
        my.moveIntent = getMovingPriority();

        // advance message
        if (Directives) Directives.nextMessage(1);
    };

    var endMoving = function(direction, room) {
        //console.log("end move: " + direction);
        if (!moving[direction]) {
            console.log("Not moving " + direction);
            return;
        }
        moving[direction] = false;
        my.moveIntent = getMovingPriority();
    };

    var checkInput = function(id, room) {

        if (playerInput[id].up && !moving[Directions.top]) {
            startMoving(Directions.top, room);
        }
        else if (!playerInput[id].up && moving[Directions.top]) {
            endMoving(Directions.top, room);
        }

        if (playerInput[id].down && !moving[Directions.bottom]) {
            startMoving(Directions.bottom, room);
        }
        else if (!playerInput[id].down && moving[Directions.bottom]) {
            endMoving(Directions.bottom, room);
        }

        if (playerInput[id].left && !moving[Directions.left]) {
            startMoving(Directions.left, room);
        }
        else if (!playerInput[id].left && moving[Directions.left]) {
            endMoving(Directions.left, room);
        }

        if (playerInput[id].right && !moving[Directions.right]) {
            startMoving(Directions.right, room);
        }
        else if (!playerInput[id].right && moving[Directions.right]) {
            endMoving(Directions.right, room);
        }

    };

    return my;
};
