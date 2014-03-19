
var Rect = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

Rect.prototype.left = function() {
    return this.x;
};

Rect.prototype.right = function() {
    return this.x + this.width;
};

Rect.prototype.top = function() {
    return this.y;
};

Rect.prototype.bottom = function() {
    return this.y + this.height;
};

Rect.prototype.intersects = function(rect) {
    return !(
           this.left() >= rect.right()
        || this.right() <= rect.left()
        || this.top() >= rect.bottom()
        || this.bottom() <= rect.top()
        );
};

var intersects = function(positionA, sizeA, positionB, sizeB) {
    return !(
           positionA.x >= (positionB.x + sizeB.width)
        || (positionA.x + sizeA.width) <= positionB.x
        || positionA.y >= (positionB.y + sizeB.height)
        || (positionA.y + sizeA.height) <= positionB.y
        );
};