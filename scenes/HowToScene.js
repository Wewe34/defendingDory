

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
        this.cameras.main.backgroundColor.setTo(255, 127, 80);


        //directions. Seperated because the text would go off the page

        this.add.text(200, 150, 'HOW TO PLAY', { font: '60px Times New Roman', fill: '#fff'});
        this.add.text(200, 250, 'I...I...I cut myself trying to find my way back home!', { font: '25px Times New Roman', fill: '#fff'});
        this.add.text(200, 280, "I don't remember how it happened!", { font: '25px Times New Roman', fill: '#fff'});
        this.add.text(200, 310, 'Now the nearby sharks have a taste for my blood and I..I..I..I am in great danger!!', { font: '25px Times New Roman', fill: '#fff'});
        this.add.text(200, 340, 'Use the arrow keys to help me dodge the sharks.', { font: '25px Times New Roman', fill: '#fff'});
        this.add.text(200, 370, 'I..I only have 7 lives! A life will be deducted if I am hit.', { font: '25px Times New Roman', fill: '#fff'});
        this.add.text(200, 400, 'The longer you last, the higher your score. BUT, more sharks will come and they are much faster!', { font: '25px Times New Roman', fill: '#fff'});
        this.add.text(200, 430, 'So whatever you do...just keep swimming, just keep swimming, just keep swimming..', { font: '25px Times New Roman', fill: '#fff'});
        let back = this.add.text(200, 500, 'BACK', { font: '40px Times New Roman', fill: '#fff'});
        let play = this.add.text(400, 500, 'PLAY', { font: '40px Times New Roman', fill: '#fff'});

        back.setInteractive();
        play.setInteractive();

        back.on("pointerup", () => {
            this.scene.start('Menu')
        })
        play.on("pointerup", () => {
            this.scene.start('Play')
        })
    }
}