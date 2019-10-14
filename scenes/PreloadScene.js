

export class PreloadScene extends Phaser.Scene {
    constructor () {
        super("Preload")
    }
    init()
    {

    }

    preload()
    {
        //Landing pagee
        this.load.audio('justKeepSwimming', 'assets/Dory.mp3');
        this.load.audio('underwater', 'assets/underthesea.mp3');
        this.load.image('bg', 'assets/deepblue.jpg');
        this.load.image('sharkRight', 'assets/sharkRight.png');
        this.load.image('fishRight', 'assets/fishRight.png');

        //Menu page
        this.load.image('bg', 'assets/deepblue.jpg');
        this.load.image('sharkLeft', 'assets/sharkTrim.png');
        this.load.image('fishLeft', 'assets/fishLeft.png');


        //Play page
         //audio
         this.load.audio('sharkHit', 'assets/hit.mp3');

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
         this.load.spritesheet('collideLeft', 'assets/collideLeft.png', {
             frameWidth: 480,
             frameHeight: 270
         });
         this.load.spritesheet('collideRight', 'assets/collideRight.png', {
             frameWidth: 480,
             frameHeight: 270
         });

         //how to
         this.load.image('bg', 'assets/deepblue.jpg');

    }

    create()
    {

        setTimeout(() => {
            this.scene.start('Landing');
        }, 1)
    }
}