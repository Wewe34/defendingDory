/* eslint-disable quotes */

export class PreloadScene extends Phaser.Scene {
    constructor () {
        super("Preload")
    }

    preload()
    {
    //background
    this.cameras.main.backgroundColor.setTo(0, 0, 0);

    //progress bar loading functions and styling

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(55, 207, 140, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 110,
            text: 'Loading...',
            style: {
                font: '30px Optima',
                fill: '#fff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(200, 60, 180, 1);
            progressBar.fillRect(470, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });

        //make progress bar and text disappear after completed
        this.load.on('complete', function () {
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

    //Landing page
        this.load.audio('justKeepSwimming', "/assets/Dory.mp3");
        this.load.audio('underwater', "/assets/underthesea.mp3");
        this.load.image('bg', "/assets/deepblue.jpg");
        this.load.image('sharkRight', "/assets/sharkRight.png");
        this.load.image('fishRight', "/assets/fishRight.png");

    //Menu page
        this.load.image('bg', "/assets/deepblue.jpg");
        this.load.image('sharkLeft', "/assets/sharkTrim.png");
        this.load.image('fishLeft', "/assets/fishLeft.png");


    //Play page
         //audio
         this.load.audio('sharkHit', "/assets/hit.mp3");

         //images
         this.load.image('red', "/assets/dripBlood.png");
         this.load.image('ocean', "/assets/deepblue.jpg");
         this.load.image('sharkFaceLeft', "/assets/sharkTrim.png");
         this.load.image('sharkRight', "/assets/sharkRight.png");
         this.load.image('bubbleParticle', "/assets/bubble.png");
         this.load.spritesheet('fish', "/assets/spritesheet.png", {
             frameWidth: 480,
             frameHeight: 270
         });
         this.load.spritesheet('collideLeft', "/assets/collideLeft.png", {
             frameWidth: 480,
             frameHeight: 270
         });

    //How To page
         this.load.image('bg', "/assets/deepblue.jpg");

    }

    create()
    {
        this.scene.start('Landing');
    }
}