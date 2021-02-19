import Phaser from 'phaser'

export let gameState: any = {}
// gameState.money = 0;

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'StartScene',
    })
  }

  preload() {
    this.load.image('sky', 'assets/skies/space3.png')

    //lets learn atlases
    this.load.atlas(
      'blackcat',
      'assets/sprites/blackcatAtlas.png',
      'assets/sprites/blackcat(1).json',
    )
  }

  create() {
    this.add.image(300, 300, 'sky')

    //var atlasTexture = this.textures.get('blackcat');
    //var frames = atlasTexture.getFrameNames();
    this.add.image(400, 450, 'blackcat', 'sprite2')

    gameState.startText = this.add
      .text(225, 340, 'Click here to start', {
        color: '#fff',
        fontSize: '30px',
      })
      .setInteractive()
    gameState.startText.on('pointerup', () => {
      this.scene.stop('StartScene')
      this.scene.start('GameScene')
    })
  }
}
