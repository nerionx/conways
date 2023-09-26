var app;

function setup(){
   console.log("Settings up life");
   createCanvas(800, 600);
   app = new App(800,600);
   app.initialise();
}

/**
 * P5JS draw function
 */
function draw(){
   app.update();
   app.draw();
}




