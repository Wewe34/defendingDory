var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var cursors;
var dory;
var sharkLeft;
var sharkRight;
var fishParticles;
var bubbleEmitter;
var facingRight = true;


function preload ()
{
    this.load.image('ocean', 'assets/deepblue.jpg');
    // this.load.image('fishRight', 'assets/fishRight.png');
    this.load.image('sharkLeft', 'assets/sharkLeft.png');
    this.load.image('sharkRight', 'assets/sharkRight.png');
    this.load.image('bubbleParticle', 'assets/bubble.png');
    this.load.spritesheet('fish', 'assets/spritesheet.png', {
        frameWidth: 480,
        frameHeight: 270
    });
}

function create ()
{
    this.add.image(0,0,'ocean').setScale(.5);

    sharkLeft = this.add.image(500,400,'sharkLeft').setScale(.2);
    sharkRight = this.add.image(400,200,'sharkRight').setScale(.19);

    cursors = this.input.keyboard.createCursorKeys();

    dory = this.add.sprite(200,400,'fish').setScale(.2);

    this.anims.create({
        key: 'dory-switch',
        frames: this.anims.generateFrameNumbers('fish'),
        frameRate: 10,
        repeat: 0,
      });



    fishParticles = this.add.particles('bubbleParticle');
    bubbleEmitter = fishParticles.createEmitter({
        x: 0,
        y: 0,
        speed: 50,
        lifespan: 500,
        frequency: 50,
        quantity: 5,
        gravityX: -300,
        on: false,
        blendMode: 'ADD',
        scale: {start: .03, end: 0.03}
    })

    bubbleEmitter.startFollow(dory);

}


function update ()
{
    if (cursors.left.isDown)
    {
        dory.x -= 8;
        dory.scale.x = -1;
        bubbleEmitter.on = true;
        bubbleEmitter.gravityX = 300;
        if (facingRight) {
            dory.play('dory-switch');
            dory.flipX = false;
            facingRight = false;
        }
    }
    else if (cursors.right.isDown)
    {
        dory.x += 8;
        dory.scale.x = 1;
        bubbleEmitter.on = true;
        bubbleEmitter.gravityX = -300;
        if (!facingRight) {
            dory.play('dory-switch');
            dory.flipX = true;
            facingRight = true;
        }

    }
    else {
        bubbleEmitter.on = false;
    }

    if (cursors.up.isDown)
    {
        dory.y -= 8;
    }
    else if (cursors.down.isDown)
    {
        dory.y += 8;
    }
}