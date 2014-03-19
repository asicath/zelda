
var Rect = function(position, width, height, xOffset, yOffset) {
    this.position = position;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.width = width;
    this.height = height;
};

Rect.prototype.left = function() {
    return this.position.x + this.xOffset;
};

Rect.prototype.right = function() {
    return this.left() + this.width;
};

Rect.prototype.top = function() {
    return this.position.y + this.yOffset;
};

Rect.prototype.bottom = function() {
    return this.top() + this.height;
};

Rect.prototype.intersects = function(rect) {
    return !(
           this.left() >= rect.right()
        || this.right() <= rect.left()
        || this.top() >= rect.bottom()
        || this.bottom() <= rect.top()
        );
};

/*
var intersects = function(positionA, sizeA, positionB, sizeB) {
    return !(
           positionA.x >= (positionB.x + sizeB.width)
        || (positionA.x + sizeA.width) <= positionB.x
        || positionA.y >= (positionB.y + sizeB.height)
        || (positionA.y + sizeA.height) <= positionB.y
        );
};
*/