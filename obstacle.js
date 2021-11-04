class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 50;
  }

  show() {
    fill(255, 0, 0, 100);
    stroke(255);
    circle(this.x, this.y, this.r);
  }
  
  setPosition(x, y) {
    x = this.x;
    y = this.y;

   }
  }