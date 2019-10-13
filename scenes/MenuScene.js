

export class MenuScene extends Phaser.Scene {
    constructor () {
        super({
            key: 'MENU'
        })
    }
    init(){

    }
    preload(){
    //audio
    this.load.audio('justKeepSwimming', 'assets/Dory.mp3');
    }
    create() {
        this.scene.start('PLAY', 'HEllo from Menu')

          //audio

          this.soundtrack = this.sound.add('justKeepSwimming');
          this.soundtrack.play({
              mute: false,
              volume: 4,
              rate: 1,
              detune: 0,
              seek: 0,
              loop: true,
              delay: 0
          })
    }
}
