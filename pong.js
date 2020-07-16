const canvas = document.getElementById("pongGround");
const ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height / 2;

function centerLine(){
    // Create a centre line
    const centreLine = canvas.height / 2
    ctx.beginPath();
    ctx.moveTo(0, centreLine);
    ctx.lineTo(canvas.width, centreLine);
    ctx.stroke();
    ctx.closePath();
}

function circle(){
    // Create a circle
    const centreX = canvas.width / 2;
    const centreY = canvas.height / 2;
    ctx.beginPath();
    ctx.arc(centreX, centreY, 40, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
}
    
// Attributes of ball speed
let dx = 2;
let dy = -2;

// Create ball
const ballRadius = 10;
function createBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#2B65EC";
    ctx.fill();
    ctx.closePath();
}


// Function to generate random colour for canvas object
function getRandomColour(){
    const letters = "0123456789ABCDEF";
    let colour = "#";
    for (let i = 0; i < 6; i++){
        colour += letters[Math.floor(Math.random() * 16)];
    }
    if (colour == "#009900"){
        getRandomColour();
    }
    return colour;
}

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightKey = false;
let leftKey = false;
// Create player paddle
function createPlayerPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ff3399";
    ctx.fill();
    ctx.closePath();
}

// Control paddle
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightKey = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftKey = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightKey = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftKey = false;
    }
}

function playerControl(){
    if(rightKey && paddleX < canvas.width - paddleWidth){
        paddleX += 5;
    }

    else if(leftKey && paddleX > 0){
        paddleX -= 5;
    }
}


// Create opponent paddle
let oppPaddleX = (canvas.width - paddleWidth) / 2;
let oppSpeed = 2.5;
function createOpponentPaddle(){
    ctx.beginPath();
    ctx.rect(oppPaddleX, 0, paddleWidth, paddleHeight);
    ctx.fillStyle = "ff0000";
    ctx.fill();
    ctx.closePath();
}

function opponentControl(){
    oppPaddleX += oppSpeed;
    if(oppPaddleX > canvas.width - paddleWidth){
        oppSpeed = -2.5;
        oppPaddleX += oppSpeed;
    }
    if(oppPaddleX < 0){
        oppSpeed = 2.5;
        oppPaddleX += oppSpeed;
    }
}

// Create scoreboard
let playerScore = 0;
function playerScoreBoard(){
    ctx.font = "22px Sans Serif";
    ctx.fillStyle = "#0000DD";
    ctx.fillText("Player: " + playerScore, 8, 460);
}

function playerScoringSystem(){
    if(playerScore == 9){
        alert("Player Won!");
        document.location.reload();
        clearInterval(interval);
    }
    else{
        playerScore++;
        x = canvas.width / 2;
        y = canvas.height / 2;
        dx = 2;
        dy = 2;
    }
}

let opponentScore = 0;
function opponentScoreBoard(){
    ctx.font = "22px Sans Serif";
    ctx.fillStyle = "#0000DD";
    ctx.fillText("Computer: " + opponentScore, 8, 20);
}

function opponentScoringSystem(){
    if(opponentScore == 9){
        alert("Opponent Won!");
        document.location.reload();
        clearInterval(interval);
    }
    else{
        opponentScore++;
        x = canvas.width / 2;
        y = canvas.height / 2;
        dx = -2;
        dy = -2;
    }
}

// Function that build the game
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    centerLine();
    circle();
    createBall();
    createPlayerPaddle();
    createOpponentPaddle();
    playerScoreBoard();
    opponentScoreBoard();

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    else if(y + dy > canvas.height - ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            if(y = y - paddleHeight){
                dy = -dy;
            }
        }
        else{
            opponentScoringSystem();
        }
    }
    else if(y + dy < ballRadius){
        if(x > oppPaddleX && x < oppPaddleX + paddleWidth){
            if(y = y + paddleHeight){
                dy = -dy;
            }
        }
        else{
            playerScoringSystem();
        }
    }

    playerControl();
    opponentControl();
    x += dx;
    y += dy;
}

let interval = setInterval(draw, 10);