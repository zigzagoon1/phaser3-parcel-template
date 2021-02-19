import Phaser from 'phaser'
import HelloWorldScene from './scenes/HelloWorldScene'

import GameScene from './scenes/GameScene'
import  StartScene  from './scenes/StartScene'


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '0xffffff',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: true
		}
	},
	scene: [StartScene, GameScene]
}

export default new Phaser.Game(config)
