class PhysOBJ{
  constructor{
    this.force = createVector(0,0);
    this.mass = 1;
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(0)
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 2;
  }
  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(mass);
  }
}