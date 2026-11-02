import { PlayButton } from "../components/play-button.js";

export class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
        this.playButton = new PlayButton(this);
        this.stop = false;
    }
    preload() {
        this.load.image('background', '/circus/client/assets/game/menu/fondo-mprincipal.png');
        this.playButton.preload();

    }

    create() {
        this.add.image(400, 250, 'background');
        this.start = this.playButton.create();

    }


}