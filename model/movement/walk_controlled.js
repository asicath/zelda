var WalkControlled = function(mover) {
    var my = Walk(mover);

    var executeMove_parent = my.executeMove;
    my.executeMove = function(room) {
        checkInput(mover.playerId);
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

    var startMoving = function(direction) {
        //console.log("start move: " + direction);
        if (moving[direction]) {
            console.log("Already moving " + direction);
            return;
        }
        moving[direction] = true;
        my.moveIntent = getMovingPriority();
    };

    var endMoving = function(direction) {
        //console.log("end move: " + direction);
        if (!moving[direction]) {
            console.log("Not moving " + direction);
            return;
        }
        moving[direction] = false;
        my.moveIntent = getMovingPriority();
    };

    var checkInput = function(id) {

        if (playerInput[id].up && !moving[Directions.top]) {
            startMoving(Directions.top);
        }
        else if (!playerInput[id].up && moving[Directions.top]) {
            endMoving(Directions.top);
        }

        if (playerInput[id].down && !moving[Directions.bottom]) {
            startMoving(Directions.bottom);
        }
        else if (!playerInput[id].down && moving[Directions.bottom]) {
            endMoving(Directions.bottom);
        }

        if (playerInput[id].left && !moving[Directions.left]) {
            startMoving(Directions.left);
        }
        else if (!playerInput[id].left && moving[Directions.left]) {
            endMoving(Directions.left);
        }

        if (playerInput[id].right && !moving[Directions.right]) {
            startMoving(Directions.right);
        }
        else if (!playerInput[id].right && moving[Directions.right]) {
            endMoving(Directions.right);
        }

    };

    return my;
};
