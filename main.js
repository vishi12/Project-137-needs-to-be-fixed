status = "";
objects = [];

function setup(){
    canvas = createCanvas(400,300);
    canvas.center();
    video = createCapture(400,300)
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
    item_name = document.getElementById("item_name").value;
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    video.speed(1);
    video.volume(0);
}
 
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 400, 300);

    if (status != ""){
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status - Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

    if(objects[i].label == item_name) { 
        video.stop();
        objectDetector.detect(gotResult); 
        document.getElementById("detected").innerHTML = item_name + " Found";
        synth = window.speechSynthesis;
        utterThis = new SpeechSynthesisUtterance(item_name + "Found");
        synth.speak(utterThis); 
    } 
    else { 
            document.getElementById("detected").innerHTML = item_name + " Not Found"; 
    }
    
}