let video;
let latestPrediction = null; 
let modelIsLoading = true;
let crownImage;
let frecklesImage;
let mouth;
let freckleSwitch = false; 
let overLay;

const FOREHEAD_POINT = 10;
const LEFT_FOREHEAD = 103; 
const RIGHT_FOREHEAD = 332;
const LEFT_CHEEK = 118;
const RIGHT_CHECK = 347;
const NOSE_POINT = 195;
const UPPER_LIP = 13;
const BOTTOM_LIP = 14; 

//p5 function 
function preload(){
    crownImage = loadImage("assets/leaves_crown.png");
    frecklesImage = loadImage("assets/blush_freckles.png");
    //overLay = loadImage("assets/heart_overlay.png")
    

}


function setup(){
    createCanvas(640,480);
    video = createCapture(VIDEO); 
    video.size(width, height);
    let facemesh; //global variable that keep tracks of our face frame-to-frame
    facemesh = ml5.facemesh(video, () => {
        console.log("Model is ready!");
        modelIsLoading = false;
    }); 

    facemesh.on("predict",(results) => {
        //results is an array
        //we care about the first object only
        //results[0]
        //console.log(results[0]);
        latestPrediction = results[0];
        
    });

    video.hide();
}

function draw() {
    // if (modelIsLoading)
    // show a loading screen
    // draw webcam video
    imageMode(CORNER);
    image(video, 0, 0, width, height);
    //-----------------------------------
    if (latestPrediction == null) return; // don't draw anything else
    // get forhead locations
    let foreheadLocation = latestPrediction.scaledMesh[FOREHEAD_POINT];
    let leftForeheadLocation = latestPrediction.scaledMesh[LEFT_FOREHEAD];
    let rightForeheadLocation = latestPrediction.scaledMesh[RIGHT_FOREHEAD];

    let noseLocation = latestPrediction.scaledMesh[NOSE_POINT]; 
    let leftCheekLocation = latestPrediction.scaledMesh[LEFT_CHEEK];
    let rightCheekLocation = latestPrediction.scaledMesh[RIGHT_CHECK];

    let foreheadWidth = dist(
      leftForeheadLocation[0 /* x */],
      leftForeheadLocation[1 /* y */],
      rightForeheadLocation[0 /* x */],
      rightForeheadLocation[1 /* y */]
    );

    let cheekWidth = dist(
      leftCheekLocation[0 /* x */],
      leftCheekLocation[1 /* y */],
      rightCheekLocation[0 /* x */],
      rightCheekLocation[0 /* y */]
      );
    console.log(foreheadWidth);
    console.log(cheekWidth);
    let crownWidth = foreheadWidth * 3;
    
    let crownHeight = (crownImage.height / crownImage.width) * crownWidth;
    let frecklesWidth = cheekWidth * 1.25; 
    let frecklesHeight = (frecklesImage.height / frecklesImage.width) * frecklesWidth;

    imageMode(CENTER);
    image(
      crownImage,
      foreheadLocation[0 /* x */],
      foreheadLocation[1 /* y */],
      crownWidth /* width */,
      crownHeight /* height */
    );

   

  let upperLipLocation = latestPrediction.scaledMesh[UPPER_LIP];
  let bottomLipLocation = latestPrediction.scaledMesh[BOTTOM_LIP];
  
  mouth = dist(
    upperLipLocation[0 /* x */],
    upperLipLocation[1 /* y */],
    bottomLipLocation[0 /* x */],
    bottomLipLocation[1 /* y */]
  );

    if(mouth >=10){
      freckleSwitch = true;
    }

  if(freckleSwitch){ //if the distance is greater than 10, add freckles
    image(
      frecklesImage,
      noseLocation[0],
      noseLocation[1],
      frecklesWidth,
      frecklesHeight
      
    );
  
    if(mouseIsPressed)
    freckleSwitch = false;
    
    }

    
}

