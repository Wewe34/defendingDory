

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

    this.load.image('bg', 'assets/deepblue.jpg');
    this.load.image('sharkLeft', 'assets/sharkTrim.png');
    this.load.image('fishLeft', 'assets/fishLeft.png');
    }

    create()
    {



        //styling
        let background = this.add.image(100, 100, 'bg').setScale(0.5);
        this.add.text(window.innerWidth/8, 80, "DEFENDING DORY", { font: "100px Times New Roman", fill: "#fff"});


            this.dory = this.physics.add.sprite(window.innerWidth, 320, 'fishLeft').setScale(.1);
            this.dory.body.allowGravity = false;
            this.dory.body.velocity.x = -620;

            this.shark = this.physics.add.sprite(window.innerWidth + 450, 320, 'sharkLeft').setScale(.3);
            this.shark.body.allowGravity = false;
            this.shark.body.velocity.x = -680;


        let howTo = this.add.text(window.innerWidth/4, 300, "HOW TO PLAY", { font: "50px Times New Roman", fill: "#fff"});
        let playtext = this.add.text(window.innerWidth/2.5, 400, "PLAY", { font: "50px Times New Roman", fill: "#fff"});

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

        //audio play on gesture. (chrome requirement)



    }
}
