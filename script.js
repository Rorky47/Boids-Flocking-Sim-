let colorlist = ['gold', 'yellow', 'turquoise', 'red']
const flock = [];
let obstacle;

let alignSlider, choesionSlider, seperationSlider, alignPRBox, coneView, cvSlider;

function setup() {
  createCanvas(640, 360);
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  choesionSlider = createSlider(0, 2, 0.2, 0.1);
  seperationSlider = createSlider(0, 2, 0.5, 0.1);
  coneView = radians(360);
  cvSlider = createSlider(1, 360, 360, 1);
  alignPRBox = createCheckbox('alignPerceptionRadius', false);
  obstacle = new Obstacle(mouseX,mouseY);
  background(51);
  for(let i = 0; i <100; i++){
    flock.push(new Boid());
  }
}

function draw() {
  background(51);
  for(let Boid of flock){
    Boid.edges();
    Boid.flocks(flock)
    Boid.show();
    Boid.update();
    Boid.check(obstacle);
  }
  obstacle.show();
  obstacle.setPosition(mouseX, mouseY);
  cvSlider.input( () => coneView = radians(cvSlider.value()) );
}