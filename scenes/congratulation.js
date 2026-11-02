export class Congratulation extends Phaser.Scene {
    constructor() {
        super({ key: 'congratulation' });
    }
    preload() {
        this.load.image('congratulation', '/circus/client/assets/game/menu/congrat.png');
    }

    create() {
        this.add.image(400, 250, 'congratulation');
    }
}