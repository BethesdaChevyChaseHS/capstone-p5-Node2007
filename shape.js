class Shape {
    //Set the width and height of the shapes in the game 
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    // Set the position of the shapes in the game
    getLeft() {
        return this.x;
    }
    // Set the position of the shapes in the game
    getRight() {
        return this.x + this.width;
    }
    // Set the position of the shapes in the game
    getTop() {
        return this.y;
    }
    // Set the position of the shapes in the game
    getBottom() {
        return this.y + this.height;
    }
    // Check if rectangular shapes intersect or overlap with another shape and the ! operator negates the result of this condition, meaning the method returns true if the shapes do overlap
    overlaps(shape) {
        return !(this.getRight() < shape.x || this.getBottom() < shape.y || this.x < shape.getRight() || this.y < shape.getBottom());
    }
    // Check if a point (x, y) is within the bounds of the shape
    // The method checks if the x-coordinate is greater than or equal to the left edge of the shape (this.x), less than or equal to the right edge (this.x + this.width), and similarly for the y-coordinate.
    // If all these conditions are true, it means the point is inside the shape, and the method returns true; otherwise, it returns false.
    contains(x, y) {
        return x >= this.x && // check within left edge
          x <= (this.x + this.width) && // check within right edge
          y >= this.y && // check within top edge
          y <= (this.y + this.height); // check within bottom edge
      }
}