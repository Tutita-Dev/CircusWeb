export class RestarButton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  preload() {
    this.relatedScene.load.spritesheet('restarButton', '/circus/client/assets/game/menu/restart.png', { frameWidth: 105, frameHeight: 54 });
  }

  create() {
    this.startButton = this.relatedScene.add.sprite(700, 430, 'restarButton').setInteractive();

    this.startButton.on('pointerover', () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout', () => {
      this.startButton.setFrame(0);
    });
    this.startButton.on('pointerdown', () => {
      this.relatedScene.scene.start('nivel1');
    });
  }
}