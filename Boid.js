class Boid {
  constructor() {
    this.position = createVector(random(2 * width / 5, 3 * width / 5), random(2 * height / 5, 3 * height / 5));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(1.5,3.5))
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 3.5;
    this.sz = 7;
    this.n = Math.round(random(3, 8));
    this.h = random(360);
  }

  edges() {
    if (this.position.x > width){
      this.position.x = 0;
    }else if (this.position.x < 0){
      this.position.x = width;
    }
    if(this.position.y > height) {
      this.position.y = 0;
    }else if (this.position.y < 0){
      this.position.y = height;
    }
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  	cohort(boids, distance) {
		let result = [];
		for (let other of boids) {
			if (other != this) {
				let d = sqrt(pow(min(abs(this.position.x - other.position.x), width - abs(this.position.x - other.position.x)), 2) + pow(min(abs(this.position.y - other.position.y), height - abs(this.position.y - other.position.y)), 2))
				if (d < distance) {
					result.push(other);
				}
			}
		}
		return result;
	}

  align (boids){
    let perceptionRadius = 20;
    let alignVector = createVector();
    let t = 0;
    for (let boid_in_list of this.cohort(boids,perceptionRadius)) {
      alignVector.add(boid_in_list.velocity);
      t++;
    }
    if(t > 0){
      alignVector.div(t);
      alignVector.setMag(this.maxSpeed);
      alignVector.sub(this.velocity);
      alignVector.limit(this.maxForce);
    }
    return alignVector;
  }

  cohesion(boids){
    let perceptionRadius = 30;
    let cohesionVector = createVector();
    let t = 0;
    for (let bil of this.cohort(boids,perceptionRadius)) {
      cohesionVector.add(bil.position);
      t++;
    }
    if (t > 0){
      cohesionVector.div(t);
      cohesionVector.sub(this.position);
      cohesionVector.setMag(this.maxSpeed);
      cohesionVector.sub(this.velocity);
      cohesionVector.limit(this.maxForce);
    }
    return cohesionVector;
  }

  seperation(boids) {
    let perceptionRadius = 20;
    let seperationVector = createVector();
    let t = 0;
    for (let bil of this.cohort(boids, perceptionRadius)) {
      let d = dist(
         this.position.x,
         this.position.y,
         bil.position.x,
         bil.position.y
       );
      let diff = p5.Vector.sub(this.position, bil.position);
      diff.div(d *d);
      seperationVector.add(diff);
      t++;
    }

    if (t > 0) {
      seperationVector.div(t);
      seperationVector.setMag(this.maxSpeed);
      seperationVector.sub(this.velocity);
      seperationVector.limit(this.maxForce);
    }
    return seperationVector;
  }
  
  flocks(boids){
    let alignmentV = this.align(boids);
    let seperationV = this.seperation(boids);
    let cohesionV = this.cohesion(boids);

    alignmentV.mult(alignSlider.value());
		cohesionV.mult(choesionSlider.value());
		seperationV.mult(seperationSlider.value());

    this.acceleration.add(alignmentV);
    this.acceleration.add(seperationV);
    this.acceleration.add(cohesionV);
  }

  show() {
    let theta = this.velocity.heading() + PI / 2;
    strokeWeight(1);
    stroke(255);
    fill(this.h, 98, 58); 
    push();
    translate(this.position.x, this.position.y)
    rotate(theta);
    beginShape();
    for (let i = 0; i <= 3; i++) {
      let nextx, nexty;
      nextx = (3 * cos(i * 2 * PI / 3)) * 2;
      nexty = (3 * sin(i * 2 * PI / 3)) * 2;
      vertex(nextx, nexty);
    }
    endShape(CLOSE); 
    pop();
  } 

  check(o) {
    if (dist(this.position.x, this.position.y, o.x, o.y) < o.r) {
      let target = createVector(o.x, o.y);
      let desire = p5.Vector.sub(target, this.position);
      desire.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desire, this.velocity);
      steer.limit(this.maxSpeed);
      steer.mult(-1);
      this.velocity = steer;
    }
  }
}  