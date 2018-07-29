var pausedAt = 0;

// Enemies our player must avoid
var Enemy = function(x, y, speed, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;

    this.speed = speed;

    this.player = player;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (pausedAt != 0)
        return;

    // The player is on the same row as this enemy.
    if (player.y >= this.y && player.y < this.y + 83) {

        // The player is on the same column as this enemy.
        // The tile width is 101 pixels, but the enemy and
        // player pictures are smaller than that. Remove
        // 20 pixels from both sides so that it looks like
        // the player has really hit this enemy.
        if (player.x >= this.x - 81 && player.x < this.x + 101 - 20) {

            // The player has hit this enemy, pause and reset.
            pausedAt += dt;
        }
    }

    this.x += dt * this.speed;

    if (this.x > 5 * 101)
        this.x = -1 * 101;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';

    this.x = 101 * 2;
    this.y = 83 * 5;
};

Player.prototype.update = function(dt) {
    // Wait a little before resetting.
    if (pausedAt > dt * 33) {
        this.x = 101 * 2;
        this.y = 83 * 5;

        pausedAt = 0;
    }

    // Reached water!
    if (pausedAt != 0 || this.y === 0) {
        pausedAt += dt;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {

    // Disable movement when paused.
    if (pausedAt)
        return;

    var x = 0;
    var y = 0;

    if (direction === 'left')
        x = -101;
    if (direction === 'right')
        x = 101;
    if (direction === 'up')
        y = -83;
    if (direction === 'down')
        y = 83;

    // Make sure player cannot move outside the area.
    this.x = Math.max(0, Math.min(this.x + x, 4 * 101));
    this.y = Math.max(0, Math.min(this.y + y, 5 * 83));
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [
    new Enemy(101 * 2, 83 * 1, 50, player),
    new Enemy(101 * -1, 83 * 1, 50, player),
    new Enemy(101 * 4, 83 * 2, 100, player),
    new Enemy(101 * 0, 83 * 3, 33, player),
    new Enemy(101 * 2, 83 * 3, 33, player),
    new Enemy(101 * 4, 83 * 3, 33, player)
];


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
