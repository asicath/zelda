define(['./movement_source', '../rect', '../position'], function(MovementSource, Rect, Position) {

    return function (mover) {
        var my = MovementSource(mover);

        mover.angle = 0;

        var info = {
            angle: 0,
            velocity: 0
        };

        mover.shoot = function (angle, velocity, direction) {

            angle = (angle + Math.PI * 2) % (Math.PI * 2);

            info.angle = angle;
            info.velocity = velocity;

            if (!direction) {

                var i = Math.floor(((angle + Math.PI / 4) % (Math.PI * 2)) / (Math.PI / 2)) % 4;


                switch (i) {
                    case 3:
                        direction = Directions.top;
                        break;
                    case 2:
                        direction = Directions.left;
                        break;
                    case 1:
                        direction = Directions.bottom;
                        break;
                    case 0:
                        direction = Directions.right;
                        break;
                }

                //console.log(angle + " " + i);

                mover.setFacing(direction);
            }

        };

        mover.shootDirection = function (direction, velocity) {
            var angle;

            switch (direction) {
                case Directions.right:
                    angle = 0;
                    break;
                case Directions.top:
                    angle = Math.PI * 1.5;
                    break;
                case Directions.left:
                    angle = Math.PI;
                    break;
                case Directions.bottom:
                    angle = Math.PI * 0.5;
                    break;
            }

            mover.setFacing(direction);
            mover.shoot(angle, velocity, direction);
        };

        var moveRect = null;

        // Returns true if this source moved this frame
        my.executeMove = function () {

            if (info.velocity == 0) return false;

            if (!moveRect) {
                moveRect = new Rect(new Position(0, 0), mover.getFootPrint().width, mover.getFootPrint().height, 0, 0);
            }

            moveRect.position.copy(mover.position);

            // just go right for now
            moveRect.position.x += Math.cos(info.angle) * info.velocity;
            moveRect.position.y += Math.sin(info.angle) * info.velocity;

            mover.attemptMove(moveRect, my);

            return true;
        };

        my.onEdgeEvent = function (edge, rect) {
            return mover.onEdgeEvent(edge, rect);
        };

        my.onWallEvent = function (wall, rect) {
            mover.onEdgeEvent(wall, rect);
        };

        return my;
    };

});