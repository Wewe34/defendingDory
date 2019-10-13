

export class MenuScene extends Phaser.Scene {
    constructor () {
        super("Menu")
    }
    init()
    {

    }

    preload()
    {

    //audio
    this.load.audio('justKeepSwimming', 'assets/Dory.mp3');
    this.load.image('bg', 'assets/deepblue.jpg');
    this.load.image('sharkLeft', 'assets/sharkTrim.png');
    this.load.image('fishLeft', 'assets/fishLeft.png');
    }

    create()
    {



        //styling
        let background = this.add.image(100, 100, 'bg').setScale(0.5);
        this.add.text(window.innerWidth/8, 50, "DEFENDING DORY", { font: "100px Times New Roman", fill: "#fff"});
        this.physics.add.sprite(400, 270, 'fishLeft').setScale(.1);
        this.physics.add.sprite(900, 270, 'sharkLeft').setScale(.3);
        let howTo = this.add.text(window.innerWidth/3, 320, "HOW TO PLAY", { font: "60px Times New Roman", fill: "#fff"});
        let playtext = this.add.text(window.innerWidth/2.5, 420, "PLAY", { font: "60px Times New Roman", fill: "#fff"});

        //How to play
        howTo.setInteractive();
        howTo.on("pointerup", () => {
            this.scene.start('HowTo')
        })

        // game start
        playtext.setInteractive();
        playtext.on("pointerup", () => {
            this.scene.start('Play')
        })

        // setTimeout(() => {
        //     this.scene.start('Play')
        //   }, 5000);

        //audio play on gesture. (chrome requirement)

        //   this.sound.play('justKeepSwimming', {
        //     mute: false,
        //     volume: 4,
        //     rate: 1,
        //     detune: 0,
        //     seek: 0,
        //     loop: true,
        //     delay: 0
        // });

    }
}
