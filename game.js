import {MenuScene} from './scenes/MenuScene.js';
import {PlayGameScene} from './scenes/PlayGameScene.js';
import {HowToScene} from './scenes/HowToScene.js';


var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: -100 },
            debug: false
        }
    },
    scene: [
        MenuScene, HowToScene, PlayGameScene
    ]
};

export var game = new Phaser.Game(config);