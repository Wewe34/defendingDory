/* eslint-disable max-statements */
/* eslint-disable complexity */
export class PlayGameScene extends Phaser.Scene
{
    constructor () {
        super("Play")
        this.facingRight = true;
        this.score = 0;
        this.sharkGenLoop = null;
        this.single = null;
        this.energyLevel = 500;
        this.energyLevelText = null;
        this.isGameOver = false;
        this.isGameOverText = null;
        this.timing = null;
        this.mainMenu = null;
        this.mainMenuText = null;
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
        this.load.image('sharkFaceLeft', 'assets/sharkTrim.png');
        this.load.image('sharkRight', 'assets/sharkRight.png');
        this.load.image('bubbleParticle', 'assets/bubble.png');
        this.load.spritesheet('fish', 'assets/spritesheet.png', {
            frameWidth: 480,
            frameHeight: 270
        });


    }

    create ()
    {
        //play background
        this.add.image(0, 0, 'ocean').setScale(0.5);

        // cursor initiation
        this.cursors = this.input.keyboard.createCursorKeys();


        // back to Home
        this.mainMenu = this.add.text(20, 20, "Main Menu", { font: '20px Times New Roman', fill: '#fff'});
        this.mainMenu.setInteractive();
        this.mainMenu.on("pointerup", () => {
            this.scene.start('Menu')
        })

        //dory create and animate

        this.dory = this.physics.add.sprite(200, 400, 'fish');
        this.dory.setScale(0.2);
        this.dory.body.allowGravity = false;

        this.anims.create({
            key: 'dory-switch',
            frames: this.anims.generateFrameNumbers('fish'),
            frameRate: 10,
            repeat: 0,
        });

        this.dory.setCollideWorldBounds(true);


        //dory bubble particle emitter

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

        //dory blood particles

        this.bloodParticles = this.add.particles('red');
        this.bloodEmitter = this.bloodParticles.createEmitter({
            x: 0,
            y: 0,
            speed: 10,
            lifespan: 3000,
            frequency: 2000,
            quantity: 2,
            gravityY: 180,
            active: true,
            blendMode: 'ADD',
            scale: {start: .1, end: .1},
            alpha: {start: 1, end: 0},
            delay: 100
        })

        this.bloodEmitter.startFollow(this.dory);

        //sharks create and loop

        const sharks = this.physics.add.group();

        function sharkGen () {
        const yCoord = Math.random() * window.innerHeight;
        this.single = sharks.create(window.innerWidth + 150, yCoord, 'sharkFaceLeft').setScale(.2);
        this.single.body.allowGravity = false;
        this.single.body.velocity.x = -320;
        }

        this.sharkGenLoop = this.time.addEvent({
            delay: 800,
            callback: sharkGen,
            callbackScope: this,
            loop: true
        });

        //add collider for dory and the sharks

        this.physics.add.overlap(this.dory, sharks, this.lifeDeduct, null, this);

        //scoring setup

        this.scoreLabel = this.add.text(window.innerWidth - 300, 20, `SCORE:  ${this.score}`, {font: '20px Times New Roman'})

        if (!this.isGameOver) {
            this.timing = setInterval(() => {
                this.score += 53;
            }, 2000)
        }

        console.log(this);
        this.isGameOverText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, `GAME OVER`, {font: '70px Times New Roman'});
        this.mainMenuText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 1.5, `Main Menu`, {font: '40px Times New Roman'});
        this.isGameOverText.visible = false;
        this.mainMenuText.visible = false;

        this.mainMenuText.setInteractive();

        this.mainMenuText.on("pointerup", () => {
            setTimeout(function(){
				location.reload();
			}, 100);
        })

        //Lives remaining

       this.energyLevelText = this.add.text(700, 20, `ENERGY LEVEL:  ${this.energyLevel}`, {font: '20px Times New Roman'})


    }

    lifeDeduct()
    {
        this.energyLevel -= 100;
    }


    update ()
    {
    if(!this.isGameOver)
    {

        if (this.cursors.left.isDown)
        {
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
        //update shark quantity and speed

        if(this.score >= 350 && this.score < 700) {
            this.sharkGenLoop.delay = 700
            this.single.body.velocity.x = -350;
        }
        else if (this.score >=700 && this.score < 1400) {
            this.sharkGenLoop.delay = 600
            this.single.body.velocity.x = -380;
        }
        else if (this.score >=1400 && this.score < 3200) {
            this.sharkGenLoop.delay = 500
            this.single.body.velocity.x = -450;
        }
        else if (this.score >= 3200 && this.score < 4500) {
            this.sharkGenLoop.delay = 350
            this.single.body.velocity.x = -550;
        }
        else if (this.score >= 4500) {
            this.sharkGenLoop.delay = 300
            this.single.body.velocity.x = -650;
        }

        //update score by the second
        this.scoreLabel.text = `SCORE: ${this.score}`;

         //update lives remaining
         this.energyLevelText.text = `ENERGY LEVEL: ${this.energyLevel}`;

         //gameover
         if (this.energyLevel <= 0) {
             this.physics.pause();
             this.isGameOver = true;
             this.isGameOverText.visible = true;
             this.mainMenu.visible = false;
             this.mainMenuText.visible = true;
             clearInterval(this.timing);

            //  console.log(this.energyLevel)
            // this.isGameOver = true;
            //  console.log('game', this.isGameOver)
            // this.scene.start('GameOver', {score: this.score, isGameOver: this.isGameOver, energyLevel: this.energyLevel});
            // this.scene.restart();
            // this.isGameOver = false;
            // this.score = 0;
            // this.energyLevel = 500;
            // this.score = 0;
            // this.scoreLabel.text = `SCORE: ${this.score}`
            // console.log(this.score)
         }
    }

}

