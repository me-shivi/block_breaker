// Variables
let canvasBlock = document.getElementById("block_canvas");
let ctx = canvasBlock.getContext("2d");
let ballRadius = 10;
let xAxis = canvasBlock.width/2;
let yAxis = canvasBlock.height-20;
let dx = 2;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 90;
let paddleX = (canvasBlock.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
let blockRowCount = 5;
let blockColumnCount = 3;
let blockWidth = 90;
let blockHeight = 20;
let blockPadding = 10;
let blockOffsetTop = 30;
let blockOffsetLeft = 30;
let score = 0;
let lives = 3;
let blocks = [];
let col;
let row;

// Loop to draw blocks
for (col = 0; col < blockColumnCount; col += 1) {
    blocks[col] = [];
    for (row = 0; row < blockRowCount; row += 1) {
        blocks[col][row] = { xAxis : 0, yAxis : 0, status : 1 };
    }
}

// Event Listener
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// Key down Handler
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

// Key up Handler
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

// Mouse Handler
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvasBlock.offsetLeft;
    if (relativeX > 90 && relativeX < canvasBlock.width) {
        paddleX = relativeX - paddleWidth;
    }
}

// Used to detect collision
function collisionDetection() {
    for (col = 0; col < blockColumnCount; col += 1) {
        for (row = 0; row < blockRowCount; row += 1) {
            let b = blocks[col][row];
            if (b.status == 1) {
                if (xAxis > b.xAxis && xAxis < b.xAxis + blockWidth && yAxis > b.yAxis && yAxis < b.yAxis + blockHeight) {
                    dy = -dy;
                    b.status = 0;
                    score += 1;
                    if (score == blockRowCount * blockColumnCount) {
                        let myVar = setTimeout(alertWin, 100);
                    }
                }
            }
        }
    }
}

//Alert message
function alertWin() {
    alert("Congratulation! You win!");
    document.location.reload();
}

// Used to draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(xAxis, yAxis, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Used to draw Base paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvasBlock.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Used to draw blocks
function drawBlocks() {
    for (col = 0; col < blockColumnCount; col += 1) {
        for (row = 0; row < blockRowCount; row += 1) {
            if (blocks[col][row].status == 1) {
                let blockX = (row * (blockWidth+blockPadding)) + blockOffsetLeft;
                let blockY = (col * (blockHeight+blockPadding)) + blockOffsetTop;
                blocks[col][row].xAxis = blockX;
                blocks[col][row].yAxis = blockY;
                ctx.beginPath();
                ctx.rect(blockX, blockY, blockWidth, blockHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Used to draw Score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

// Used to draw lives
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvasBlock.width - 65, 20);
}

// Used to call other function to draw environment
function draw() {
    ctx.clearRect(0, 0, canvasBlock.width, canvasBlock.height);
    drawBlocks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    if (xAxis + dx > canvasBlock.width-ballRadius || xAxis + dx < ballRadius) {
        dx = -dx;
    }
    if (yAxis + dy < ballRadius) {
        dy = -dy;
    } else if (yAxis + dy > canvasBlock.height-ballRadius) {
        if (xAxis > paddleX && xAxis < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives -= 1;
            if (!lives) {
                alert("SORRY ! GAME OVER");
                document.location.reload();
            } else {
                xAxis = canvasBlock.width/2;
                yAxis = canvasBlock.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvasBlock.width - paddleWidth)/2;
            }
        }
    }
    if (rightPressed && paddleX < canvasBlock.width - paddleWidth) {
        paddleX = paddleX + 9;
    } else if (leftPressed && paddleX > 0) {
        paddleX = paddleX - 9;
    }
    xAxis += dx;
    yAxis += dy;
    requestAnimationFrame(draw);
}

//Display game environment
function display() {
    ctx.clearRect(0, 0, canvasBlock.width, canvasBlock.height);
    drawBlocks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
}

display();

// Used to Restart the game
function newGame() {
    location.reload();
}