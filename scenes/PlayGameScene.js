export class PlayGameScene extends Phaser.Scene
{
    constructor () {
        super({
            key: 'PLAY'
        })
        this.facingRight = true;
    }

    init(data){
        console.log(data);
        console.log('I got it');
    }

    preload ()
    {
        //images
        this.load.image('red', 'assets/dripBlood.png');
        this.load.image('ocean', 'assets/deepblue.jpg');
        this.load.image('sharkLeft', 'assets/sharkLeft.png');
        this.load.image('sharkRight', 'assets/sharkRight.png');
        this.load.image('bubbleParticle', 'assets/bubble.png');
        this.load.spritesheet('fish', 'assets/spritesheet.png', {
            frameWidth: 480,
            frameHeight: 270
        });


    }

    create ()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.image(0, 0, 'ocean').setScale(0.5);

        //this.dory

        this.dory = this.physics.add.sprite(200, 400, 'fish');
        this.dory.setScale(0.2);
        this.dory.body.allowGravity = false;
        console.log(this.dory);

        this.anims.create({
            key: 'dory-switch',
            frames: this.anims.generateFrameNumbers('fish'),
            frameRate: 10,
            repeat: 0,
        });

        this.dory.setCollideWorldBounds(true);


        //this.dory bubble particle emitter

        this.fishParticles = this.add.particles('bubbleParticle');
        this.bubbleEmitter = this.fishParticles.createEmitter({
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

        this.bubbleEmitter.startFollow(this.dory);

        //this.dory blood particles

        this.bloodParticles = this.add.particles('red');
        this.bloodEmitter = this.bloodParticles.createEmitter({
            x: 0,
            y: 0,
            speed: 10,
            lifespan: 3000,
            frequency: 3000,
            quantity: 2,
            gravityY: 180,
            active: true,
            blendMode: 'ADD',
            scale: {start: .1, end: .1},
            alpha: {start: 1, end: 0},
            delay: 100
        })

        this.bloodEmitter.startFollow(this.dory);

        //sharks

        const sharks = this.physics.add.group();

        function sharkGen () {
        const yCoord = Math.random() * window.innerHeight;
        sharks.create(window.innerWidth + 150, yCoord, 'sharkLeft').setScale(.2);
        }

        const sharkGenLoop = this.time.addEvent({
            delay: 1000,
            callback: sharkGen,
            callbackScope: this,
            loop: true
        });



    }


    update ()
    {

        if (this.cursors.left.isDown)
        {
            console.log(this.dory);
            this.dory.x -= 8;
            this.bubbleEmitter.on = true;
            this.bubbleEmitter.gravityX = 300;
            if (this.facingRight) {
                this.dory.play('dory-switch');
                this.dory.flipX = false;
                this.facingRight = false;
            }
        }
        else if (this.cursors.right.isDown)
        {
            console.log(this.dory);
            this.dory.x += 8;
            this.bubbleEmitter.on = true;
            this.bubbleEmitter.gravityX = -300;
            if (!this.facingRight) {
                this.dory.play('dory-switch');
                this.dory.flipX = true;
                this.facingRight = true;
            }

        }
        else {
            this.bubbleEmitter.on = false;
        }

        if (this.cursors.up.isDown)
        {
            this.dory.y -= 8;
        }
        else if (this.cursors.down.isDown)
        {
            this.dory.y += 8;
        }
    }
}

