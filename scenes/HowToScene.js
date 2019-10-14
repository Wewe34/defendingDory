

export class HowToScene extends Phaser.Scene {
    constructor () {
        super('HowTo')
    }
    init(){

    }
    preload(){

    }
    create() {

        //background
        this.cameras.main.backgroundColor.setTo(68, 94, 238);
        let background = this.add.image(100, 100, 'bg').setScale(0.5);


        //directions. Seperated because the text would go off the page

        this.add.text(200, 150, 'HOW TO PLAY', { font: '60px Optima', fill: '#fff'});
        this.add.text(200, 250, 'I...I...I cut myself trying to find my way back home!', { font: '25px Optima', fill: '#fff'});
        this.add.text(200, 280, "I don't remember how it happened!", { font: '25px Optima', fill: '#fff'});
        this.add.text(200, 310, 'Now the nearby sharks have a taste for my blood and I..I..I..I am in great danger!!', { font: '25px Optima', fill: '#fff'});
        this.add.text(200, 340, 'Use the arrow keys to help me dodge the sharks!', { font: '25px Optima', fill: '#fff'});
        this.add.text(200, 370, 'If I am hit or get too close, my blood will go down. Don\'t let it get to 0!', { font: '25px Optima', fill: '#fff'});
        this.add.text(200, 400, 'The longer you last, the higher your score. BUT, more sharks will come and they are much faster!', { font: '25px Optima', fill: '#fff'});
        this.add.text(200, 430, 'So whatever you do...just keep swimming, just keep swimming, just keep swimming..', { font: '25px Optima', fill: '#fff'});
        let back = this.add.text(200, 500, 'BACK', { font: '40px Optima', fill: '#fff'});

        back.setInteractive({ cursor: 'pointer' });

        back.on("pointerup", () => {
            this.scene.start('Menu')
        })
    }
}