

export class PlayButton {
  constructor(scene) {
    this.relatedScene = scene;

  }

  preload() {
    this.relatedScene.load.spritesheet('playButton', '/circus/client/assets/game/menu/Start - 105 - 54.png', { frameWidth: 105, frameHeight: 54 });
    this.relatedScene.load.audio('soundMenu', '/circus/client/assets/sounds/circus_charlie_nes.mp3');
  }

  create() {
    this.startButton = this.relatedScene.add.sprite(700, 430, 'playButton').setInteractive();

    this.startSoundMenu = this.relatedScene.sound.add('soundMenu');
    this.startSoundMenu.play();

    this.startButton.on('pointerover', () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout', () => {
      this.startButton.setFrame(0);
    });
    this.startButton.on('pointerdown', () => {
      this.relatedScene.scene.start('nivel1');
      this.startSoundMenu.stop();
    });
  }

}