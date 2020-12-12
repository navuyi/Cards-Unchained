
// Global variables
// Create canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mousePressed = false;
var lastX, lastY;
var socket;
const backgroundColor = '#dedede';


// Handle mouse clicks
$('#canvas').mousedown(function (e) {
    mousePressed = true;
    Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
});

$('#canvas').mousemove(function (e) {
    if (mousePressed) {
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
    }
});

$('#canvas').mouseup(function (e) {
    mousePressed = false;
});
$('#canvas').mouseleave(function (e) {
    mousePressed = false;
});

// Listen for draw data from SERVER
socket.on('drawData', data =>{
    ctx.beginPath();
    ctx.strokeStyle = data.color;
    ctx.lineWidth = data.width
    ctx.lineJoin = "round";
    ctx.moveTo(data.lastX, data.lastY);
    ctx.lineTo(data.x, data.y);
    ctx.closePath();
    ctx.stroke();
});



// Listen for init draw data from SERVER
socket.on('initDraw', data => {
    ctx.beginPath();
    ctx.strokeStyle = data.color;
    ctx.lineWidth = data.width
    ctx.lineJoin = "round";
    ctx.moveTo(data.lastX, data.lastY);
    ctx.lineTo(data.x, data.y);
    ctx.closePath();
    ctx.stroke();
});




function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = document.getElementById('selWidth').value;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        
        // Send draw data to server
        data = {
            color: $('#selColor').val(),
            width: $('#selWidth').val(),
            x: x,
            y: y,
            lastX: lastX,
            lastY: lastY
        };
        socket.emit('drawData', data);
    }
    lastX = x; lastY = y;
}

document.getElementById("clearButton").addEventListener("click", clear);
function clear(){
    var confirmation = false;
    confirmation = confirm("Press OK to clear canvas.");
    if(confirmation == true){
        // Clear canvas with basic color
        ctx.clearRect(0,0, canvas.width, canvas.height);

        // Send signal to server to clear other client's canvas
        data = {
            clearSig: true
        };
        socket.emit("clearSig", data);
    }else{
        // nothing happens
    }
}









