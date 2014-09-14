define(function() {

    var Position = function(x, y) {
        this.x = x;
        this.y = y;
    };

    Position.prototype.clone = function() {
        return new Position(this.x, this.y);
    };

    Position.prototype.copy = function(position) {
        this.x = position.x;
        this.y = position.y;
    };

    return Position;
});
