let scores = 0;

// Enemy object
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if(this.x > 450){
        this.x = 0;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
    if(parseInt(this.x) >= player.x - 100 && parseInt(this.x) <= player.x + 40 && this.y === player.y){
        player.reset();
        allLife.pop();
        score.oddScores();
        player.gameOver();
    }
};

//Player object
let Player = function(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 340;
};

Player.prototype.handleInput = function(key) {
    if(key === 'left' && this.x > 0 ){
        this.x -= 40;
    }else if(key === 'right' && this.x < 400){
        this.x += 40;
    }else if(key === 'up' && this.y > 0){
        this.y -= 40;

        if(this.y < 40){
            scores += 100;
            player.gameWin();
            this.reset();
        }
    }else if(key === 'down' && this.y < 400){
        this.y += 40;
    }
};

Player.prototype.gameWin = function() {
    if(scores !== 500) return;

    swal({
        title: "Congratulations!",
        text: "You earnd 500 scores",
        type: "success",
        confirmButtonText: "Play again!"
    }).then(function(isConfirm) {
        if (isConfirm) {
            window.location.reload(true);
        }     
    })  
};

Player.prototype.gameOver = function() {
    if(allLife.length !== 0) return;

        swal({
            title: "Game over!",
            text: "You lose all life",
            type: "error",
            confirmButtonText: "Play again!"
        }).then(function(isConfirm) {
            if (isConfirm) {
                window.location.reload(true);
            }     
        })
};

//Score object
let Score = function(x, y){
    this.x = x;
    this.y = y;
    this.score = `Points: ${scores}`;
}

Score.prototype.render = function() {
    ctx.font = "15px arial";
    ctx.fillText(this.score, this.x, this.y);
};

Score.prototype.update = function() {
    this.score = `Points: ${scores}`;
};

Score.prototype.oddScores = function() {
    if (scores >= 100){
        scores -= 100;
    }
};

//Life object
let Life = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
};

Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 30, 45);
};
// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(320, 220, 260), new Enemy(120, 140, 60), new Enemy(40, 60, 400)];
// Place the player object in a variable called player
let player = new Player('images/char-cat.png', 200, 340);
// Place the score object in a variable called score
let score = new Score(425, 570);
// Place all life objects in an array called allLife
let allLife = [new Life(20, 540), new Life(60, 540), new Life(100, 540)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});