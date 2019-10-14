/* eslint-disable max-statements */
/* eslint-disable complexity */
export class PlayGameScene extends Phaser.Scene
{
    constructor () {
        super("Play")
        this.facingRight = true;
        this.score = 0;
        this.finalScoreText = null;
        this.sharkGenLoop = null;
        this.single = null;
        this.bloodLevel = 500;
        this.bloodLevelText = null;
        this.isGameOver = false;
        this.isGameOverText = null;
        this.timing = null;
        this.mainMenu = null;
        this.mainMenuText = null;
        this.gameIsPaused = false;
    }

    init(data){
        console.log(data);
        console.log('I got it');
    }

    preload ()
    {


    }

    create ()
    {
        //play background
        this.add.image(0, 0, 'ocean').setScale(0.5);

        // cursor initiation
        this.cursors = this.input.keyboard.createCursorKeys();


        // back to Home
        this.mainMenu = this.add.text(20, 20, "MAIN MENU", { font: '20px Optima', fill: '#fff'});
        this.mainMenu.setInteractive({ cursor: 'pointer' });
        this.mainMenu.on("pointerup", () => {
            clearInterval(this.timing);
            this.scene.start('Menu')
        })

        //dory create and animate

        this.dory = this.physics.add.sprite(200, 400, 'fish');
        this.dory.setScale(0.2);
        this.dory.body.allowGravity = false;

        this.anims.create({
            key: 'dory-switch',
            frames: this.anims.generateFrameNumbers('fish'),
            frameRate: null,
            repeat: 0,
        });

        this.anims.create({
            key: 'collideLeft',
            frames: this.anims.generateFrameNumbers('collideLeft'),
            frameRate: null,
            repeat: 0,
        });

        this.anims.create({
            key: 'collideRight',
            frames: this.anims.generateFrameNumbers('collideRight'),
            frameRate: 5,
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

        this.scoreLabel = this.add.text(this.sys.game.config.width - 200, 20, `SCORE:  ${this.score}`, {font: '20px Optima'})

        if (!this.isGameOver && !this.gameIsPaused) {
            this.timing = setInterval(() => {
                this.score += 93;
            }, 2000)
        }
        //clean

        this.isGameOverText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, `GAME OVER`, {font: '90px Optima'}).setDepth(5);
        this.finalScoreText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 1.5, `FINAL SCORE: ${this.score}`, {font: '60px Optima'}).setDepth(5);
        this.mainMenuText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 1.2, `MAIN MENU`, {font: '40px Optima'}).setDepth(5);
        this.isGameOverText.visible = false;
        this.mainMenuText.visible = false;
        this.finalScoreText.visible = false;

        this.mainMenuText.setInteractive({ cursor: 'pointer' });

        this.mainMenuText.on("pointerup", () => {
            setTimeout(function(){
				location.reload();
			}, 100);
        })

        //Lives remaining

       this.bloodLevelText = this.add.text(this.sys.game.config.width / 2.5, 20, `BLOOD LEVEL:  ${this.bloodLevel}`, {font: '20px Optima'})


    }

    lifeDeduct()
    {
        this.sound.play('sharkHit', {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });
        this.bloodLevel -= 1;
        this.dory.play('collideLeft');
    }


    update ()
    {
    if (!this.isGameOver)
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

        if(this.score >= 500 && this.score < 1000) {
            this.sharkGenLoop.delay = 600
            this.single.body.velocity.x = -400;
        }
        else if (this.score >=1000 && this.score < 2000) {
            this.sharkGenLoop.delay = 500
            this.single.body.velocity.x = -380;
        }
        else if (this.score >=2000 && this.score < 3500) {
            this.sharkGenLoop.delay = 400
            this.single.body.velocity.x = -450;
        }
        else if (this.score >= 3500 && this.score < 5500) {
            this.sharkGenLoop.delay = 300
            this.single.body.velocity.x = -550;
        }
        else if (this.score >= 5500 && this.score < 6500) {
            this.sharkGenLoop.delay = 200
            this.single.body.velocity.x = -650;
        }
        else if (this.score >= 6500){
            this.sharkGenLoop.delay = 170
            this.single.body.velocity.x = -750;
        }

        //update score by the second
        this.scoreLabel.text = `SCORE: ${this.score}`;

         //update lives remaining
         this.bloodLevelText.text = `BLOOD LEVEL: ${this.bloodLevel}`;

         //gameover
         if (this.bloodLevel <= 0) {
             this.physics.pause();
             this.isGameOver = true;
             this.isGameOverText.visible = true;
             this.finalScoreText.text = `FINAL SCORE ${this.score}`;
             this.finalScoreText.visible = true;
             this.mainMenu.visible = false;
             this.mainMenuText.visible = true;
             clearInterval(this.timing);
         }
    }

}

