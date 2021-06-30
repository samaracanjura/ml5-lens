let video;
let latestPredictions = null; 
let modelIsLoading = true;
let crownImage;

const FOREHEAD_POINT = 151;
const LEFT_FOREHEAD = 104; 
const RIGHT_FOREHEAD = 333;

//p5 function 
function preload(){
    crownImage = loadImage("assets/crown.png");
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
        latestPredictions = results[0];
        
    });

    video.hide();
}

function draw(){

   
    // if (modelIsLoading)
    // show a loading screen
    imageMode(CORNER);
    image(video, 0, 0, width, height);

    if(latestPredictions == null) return; // don't draw anything else

    //get forehead location
    let forheadLocation = latestPredictions.scaledMesh[FOREHEAD_POINT];
    console.log(forheadLocation);

   // image(crownImage, forheadLocation[0 /* x */ ] - 50, forheadLocation[1 /* y */] - 50 , 100,100);

    let leftForeheadLocation = latestPredictions.scaledMesh[LEFT_FOREHEAD];
    let rightForeheadLocation = latestPredictions.scaledMesh[RIGHT_FOREHEAD];
// line(leftForeheadLocation[0 /* x */ ], leftForeheadLocation[1 /* y */ ], rightForeheadLocation[0 /* x */ ], rightForeheadLocation[1 /* y*/ ]); 


let forheadWidth = dist(
    leftForeheadLocation[0],
    leftForeheadLocation[1],
    rightForeheadLocation[0],
    rightForeheadLocation[1]
    );
    
    console.log(forheadWidth);
    
    let crownWidth = forheadWidth * 3;

    // crownWidth;
    // crownImage.width; 
    // crownImage.height; 
    
    let crownHeight = (crownImage.height / crownImage.width) * crownWidth;

    imageMode(CENTER);
    image(
        crownImage, 
        forheadLocation[0 /* x */],
        forheadLocation[1 /* y */] - crownHeight / 2,
        crownWidth /* width */,
        crownHeight

    );
}