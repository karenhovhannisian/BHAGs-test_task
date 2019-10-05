var rect = appCanvas.getBoundingClientRect();
var ctx = document.getElementById("appCanvas").getContext("2d");
var img = document.getElementById("photo");
var pointSize = 3;
var canvasWidth = appCanvas.width;
var canvasHeight = appCanvas.height;

const squareColor = "#ff2626";
let move = false;
let index = null;

let newWay = []

function createNewWay() {
    for (let i = 0; i < points.length; i++) {
        if (points[i]["x"] > canvasWidth || points[i]['y'] > canvasHeight) {
        } else {
            newWay.push(points[i])
        }
    }
}

createNewWay();

document.getElementById("appCanvas").addEventListener('click', e => {
    move = !move
    ctx.clearRect(0, 0, appCanvas.width, appCanvas.height);
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    intermediateCoordinate(x, y);
    if (move) {
        document.getElementById("appCanvas").addEventListener('mousemove', e => {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            drawTrajectory(x, y);
        });
    }
});

function intermediateCoordinate(x, y) {
    let i = findNearbyCoordinates({x, y}, newWay);
    if (i || i === 0) {
        newWay[i] = null;
        index = i
    }
    drawWay(newWay);
}

// last coordinate mouse
document.getElementById("appCanvas").addEventListener('mouseup', e => {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    newCoordinatePoint(x, y, index);
    x = 0;
    y = 0;
    index = null
});

// draw image on coordinates
function drawImgOnCoordinates(x, y) {

    drawWay(points);
    ctx.fillStyle = squareColor; // Red color
    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
}

// newCoordinatePoint
function newCoordinatePoint(x, y, index) {
    newWay[index] = {x, y}
}

// draw trajectory
function drawTrajectory(x, y) {
    if (move) {
        ctx.fillStyle = squareColor; // Red color
        ctx.beginPath();
        ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

// draw all Coordinates
function drawWay(points) {
    for (let i = 0; i < points.length; i++) {
        if (points[i]) {
            ctx.fillStyle = squareColor; // Red color
            ctx.beginPath();
            ctx.arc(points[i]['x'], points[i]['y'], pointSize, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
}

//find Nearby Coordinates
function findNearbyCoordinates(coordinates, points) {
    let arrayOfDistances = [];
    let minIndex;

    for (let i = 0; i < points.length; i++) {
        if (points[i]) {
            if (Math.sqrt(Math.pow(coordinates.x - points[i]["x"], 2) + Math.pow(coordinates.y - points[i]["y"], 2)) > 10) {
                arrayOfDistances.push(null)
            } else {
                arrayOfDistances.push(Math.sqrt(Math.pow(coordinates.x - points[i]["x"], 2) + Math.pow(coordinates.y - points[i]["y"], 2)));
            }
        } else {
            arrayOfDistances.push(null)
        }
    }
    let min = arrayOfDistances[0];

    for (let i = 0; i < arrayOfDistances.length; i++) {
        if (arrayOfDistances[i] && arrayOfDistances[i] < min) {
            min = arrayOfDistances[i];
            minIndex = i;
        } else if (arrayOfDistances[i]) {
            min = arrayOfDistances[i];
            minIndex = i;
        }
    }

    if (!minIndex) {
        move = false
    }
    return minIndex
}

drawWay(points);
