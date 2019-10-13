var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: -100 },
            debug: false
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
var sharks;


function preload ()
{
    this.load.image('ocean', 'assets/deepblue.jpg');
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
    cursors = this.input.keyboard.createCursorKeys();
    this.add.image(0,0,'ocean').setScale(.5);

        //dory

        dory = this.physics.add.sprite(200,400,'fish').setScale(.2);
        dory.body.allowGravity = false;
        console.log(dory);

        this.anims.create({
            key: 'dory-switch',
            frames: this.anims.generateFrameNumbers('fish'),
            frameRate: 10,
            repeat: 0,
          });

          dory.setCollideWorldBounds(true);


          //dory particle emitter

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
            scale: {start: .02, end: 0.02}
        })

        bubbleEmitter.startFollow(dory);

    //sharkies

    // sharkLeft = this.physics.add.sprite(500,400,'sharkLeft').setScale(.2);
    // sharkRight = this.physics.add.sprite(400,200,'sharkRight').setScale(.19);

    const sharks = this.physics.add.group();

	function sharkGen () {
    const yCoord = Math.random() * window.innerHeight;
    sharks.create(window.innerWidth + 150, yCoord , 'sharkLeft').setScale(.2);
  }

  const sharkGenLoop = this.time.addEvent({
    delay: 1000,
    callback: sharkGen,
    callbackScope: this,
    loop: true
  });

    console.log(sharkLeft);



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