import { RestarButton } from "../components/restar-button.js";

export class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' });
        this.restarButton = new RestarButton(this);
    }
    preload() {
        this.load.image('endgame', '/circus/client/assets/game/menu/GAMEOVER.png');
        this.restarButton.preload();
    }

    create() {
        this.add.image(400, 250, 'endgame');
        this.restarButton.create();
    }

}