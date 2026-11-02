import  {Congratulation}  from '/circus/client/scenes/congratulation.js';
import { GameOver } from '/circus/client/scenes/gameOver.js';
import {Menu} from '/circus/client/scenes/menu.js';
import { Nivel1 } from '/circus/client/scenes/nivel1.js';
import { Nivel2 } from '/circus/client/scenes/nivel2.js';
import { Nivel3 } from '/circus/client/scenes/nivel3.js';

const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 800,
    height: 500,
    scene: [Menu, Nivel1, Nivel2, Nivel3, GameOver, Congratulation],
    physics:{
        default: 'arcade',
        arcade: {
            
            debug: false,
        },
    },
};

var game = new Phaser.Game(config);