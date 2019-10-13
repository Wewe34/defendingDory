

export class LandingPage extends Phaser.Scene {
    constructor () {
        super("Landing")
    }
    init()
    {

    }

    preload()
    {

    //audio
    this.load.audio('justKeepSwimming', 'assets/Dory.mp3');
    this.load.audio('justKeepSwimming1', 'assets/Dory.mp3');
    this.load.image('bg', 'assets/deepblue.jpg');
    this.load.image('sharkRight', 'assets/sharkRight.png');
    this.load.image('fishRight', 'assets/fishRight.png');
    }

    create()
    {



        //styling
        let background = this.add.image(100, 100, 'bg').setScale(0.5);
        this.add.text(this.sys.game.config.width/7, 80, "DEFENDING DORY", { font: "100px Times New Roman", fill: "#fff"});


            this.dory = this.physics.add.sprite(0, 320, 'fishRight').setScale(.1);
            this.dory.body.allowGravity = false;
            this.dory.body.velocity.x = 620;

            this.shark = this.physics.add.sprite(-450, 320, 'sharkRight').setScale(.3);
            this.shark.body.allowGravity = false;
            this.shark.body.velocity.x = 680;


        let enter = this.add.text(this.sys.game.config.width /2.5, this.sys.game.config.height/2, "ENTER", { font: "50px Times New Roman", fill: "#fff"});

        //How to play
        enter.setInteractive();
        enter.on("pointerup", () => {
            this.sound.play('justKeepSwimming', {
                mute: false,
                volume: 4,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            });

            this.scene.start('Menu')
        })

    }
}