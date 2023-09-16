status = "";
object = [];

function setup() {
    canvas = createCanvas(780, 560);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    ob = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status - Detecting Objects";
}

function modelLoaded() {
    console.log("Model loaded successfully");
    status = true;
}

function got_results(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(video, 0, 0, 780, 560);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        ob.detect(video, got_results)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status - Detected Objects";
            document.getElementById("Object").innerHTML = "No. of objects = " + object.length;
            fill(r, g, b);
            noFill();
            percentage = Math.floor(object[i].confidence * 100);
            text(object[i].label + " " + percentage + "%",object[i].x +5, object[i].y +5);
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].height, object[i].width);
        }
    }
}