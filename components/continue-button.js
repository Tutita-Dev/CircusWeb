export class ContinueButton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  preload() {
    this.relatedScene.load.spritesheet('continueButton', '/circus/client/assets/game/menu/continue.png', { frameWidth: 105, frameHeight: 54 });
  }

  create() {

    //definir posicion X, Y
    this.startButton = this.relatedScene.add.sprite(700, 430, 'continueButton').setInteractive();

    this.startButton.on('pointerover', () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout', () => {
      this.startButton.setFrame(0);
    });
    this.startButton.on('pointerdown', () => {

      this.relatedScene.scene.switch('nivel1');
    });
  }
}