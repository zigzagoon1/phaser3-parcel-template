import Phaser from 'phaser'
import GameState from './GameState';
let isGrounded = true;
const gameState: GameState = new GameState;
//import { Menu } from './assets/phaser3-rex-plugins/templates/ui/ui-components.js';
//import { Items } from './scenes/classitems.mjs';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    });
  }
  preload() {

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

    //this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
    //this.load.image('cat', 'assets/sprites/blackcat2small.png');
    this.load.image('platform', 'assets/sprites/platform.png');
    this.load.image('fireballLeft', 'assets/sprites/fireballresize.png');
    this.load.image('fireballRight', 'assets/sprites/fireballresizeRight.png');
    this.load.image('coin', 'assets/sprites/coinresize.png')
    this.load.audio('background', 'assets/Audio/firstTest.wav');
    this.load.audio('coin', 'assets/Audio/Pickup_Coin.wav')
    this.load.audio('jump', 'assets/Audio/Jump13.wav')
    this.load.spritesheet('alien1', 'assets/sprites/alien1resize.png', { frameWidth: 70, frameHeight: 70 });
    //this.load.spritesheet('catwalking1', '/assets/sprites/blackcatwalking1resize.png', { frameWidth: 100, frameHeight: 90});
    this.load.image('moon1', 'assets/platforms/moon1resize.png');
    this.load.spritesheet('cowboyHat', 'assets/sprites/hatsresize.png', { frameWidth: 50, frameHeight: 50 });

    //learning atlases instead of spritesheets, hooray for converting spritesheets now

    this.load.atlas('blackcat', 'assets/sprites/blackcatAtlas.png', 'assets/sprites/blackcat(1).json')



    //idr i think i was trying to make it rain but stopped lol
    // this.load.image('starfield', 'assets/phaser-examples-master/phaser-examples-master/examples/assets/particlestorm/starfield.png');
    //this.load.image('rain', '/Users/kmark/Playing With Phaser/assets/phaser-examples-master/phaser-examples-master/examples/assets/particlestorm/particles/rain.png"')

  }
  create() {


    this.sound.add('background', { loop: false });
    this.sound.play('background', { loop: false });
    this.add.image(400, 300, 'sky');
    gameState.player.sprite = this.physics.add.sprite(400, 400, 'blackcat', 'sprite1');
    gameState.testAlien = this.physics.add.sprite(50, 400, 'alien1');
    gameState.coin = this.physics.add.group();
    gameState.coin1 = gameState.coin.create(200, 450, 'coin');
    gameState.cowboyHat = this.add.group();
    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.fireButton = this.input.keyboard.addKey('F');
    gameState.fireballLeft = this.physics.add.group();
    gameState.fireballRight = this.physics.add.group();

    gameState.player.wearingHat = false;
    // gameState.cowboyHat.

    var atlasTexture = this.textures.get('blackcat');
    var frames = atlasTexture.getFrameNames();

    gameState.player.inventory = [];
    gameState.items = ['coin', 'cowboyHat']
    gameState.itemIcon = [];

    /*{
       x: gameState.player.x + 50,
       y: gameState.player.y,
      // anchor: undefined,
  
       orientation: 1,
       subMenuSide: undefined,
      items: gameState.player.inventory,
  
      //createBackgroundCallback: function(items) {
          //var scene = items.scene;
          // container = ...
         // return container;
     // },
  
      createBackgroundCallbackScope: undefined,
      createButtonCallback: function(item, index, items) {
          var scene = item.scene;
          // var isFirstButton = (index === 0);
          // var isLastButton = (index === (items.length - 1));
          // container = ...
          return container;
      },
      createButtonCallbackScope: undefined,
  
      easeIn: 0,
      // easeIn: {
      //     duration: 500,
      //     orientation: undefined,
      //     ease: 'Cubic'
      // },
  
      easeOut: 0,
      // easeOut: {
      //     duration: 100,
      //     orientation: undefined,
      //     ease: 'Linear'
      // },
      // expandEvent: 'button.click',
  
      name: 'inventory'
  });*/






    /*var particles = this.add.particles('red');
    var emitter = particles.createEmitter({
     speed: 100,
     scale: { start: 1, end: 0 },
     blendMode: 'ADD'
 }); */
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 600, 'moon1');
    //gameState.player = this.physics.add.sprite(250, 530, 'cat');

    this.physics.add.collider(platforms, gameState.player.sprite, () => {
      gameState.player.sprite!.setVelocityY(0);
    });
    this.physics.add.collider(platforms, gameState.testAlien, function () {
      gameState.testAlien.setVelocityY(0);
    })
    const alienAnim = this.anims.create({
      key: 'alien1',
      frames: this.anims.generateFrameNumbers('alien1',
        { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1

    });
    gameState.testAlien.move = this.tweens.add({
      targets: gameState.testAlien,
      x: 150,
      ease: 'Linear',
      duration: 1800,
      repeat: -1,
      yoyo: true
    })
    gameState.player.walking = this.anims.create({
      key: 'catwalking',
      frames: this.anims.generateFrameNames('blackcat', { prefix: 'sprite', start: 1, end: 3 }),
      frameRate: 3,
      repeat: -1

    });
    gameState.player.cowboyAnimation = this.anims.create({
      key: 'catwalkingcowboy',
      frames: this.anims.generateFrameNames('blackcat', { prefix: 'sprite', start: 4, end: 6 }),
      frameRate: 3,
      repeat: -1

    })









    /*this.input.on('pointermove', function(pointer) {
      emitter.setPosition(pointer.x, pointer.y);
    })
    this.input.on('pointerdown', function(pointer) {
      
      emitter.explode(100, pointer.x, pointer.y);
      
    }
    )
    this.input.on('pointerup', function(pointer) {
      emitter.flow(10);
    })
    */
    gameState.testAlien.play('alien1');
    this.physics.add.collider(gameState.fireballLeft, gameState.testAlien, function () {
      gameState.testAlien.destroy();
      gameState.fireballLeft1.destroy();

    });

    this.physics.add.collider(gameState.fireballRight, gameState.testAlien, function () {
      gameState.testAlien.destroy();
      gameState.fieballRight1.destroy();
    })


    this.physics.add.collider(gameState.coin, platforms, function () {
      gameState.coin!.setVelocityY(0);
    })

    this.physics.add.collider(gameState.coin, gameState.player.sprite, () => {
   var inventoryRect = this.add.rectangle(350, 50, 700, 100, 0x800080, 0.5)
   var inventoryText = this.add.text(10, 10, 'Inventory:', { fontSize: '20px', color: '#ffffff' })
      
      this.sound.add('coin');
      this.sound.play('coin', { loop: false })
      gameState.coin1.destroy();
      addItemToInventory('coin');



    })
    let hasCollided = false;

    this.physics.add.collider(gameState.testAlien, gameState.player.sprite, () => {
      gameState.player.sprite!.setVelocityX(0);
      gameState.testAlien.setVelocityX(0);
      gameState.testAlien.move.stop();
      if (!hasCollided) {
        hasCollided = true;
        this.add.text(50, 380, 'I\'ll trade ya for that there coin', { fontSize: '20px', color: '#ffffff' })
        gameState.hatIcon = this.add.sprite(100, 350, 'cowboyHat')
        gameState.hatIcon.setInteractive();
        gameState.hatIcon.on('pointerover', function (pointer) {
          gameState.hatIcon.setFrame(1);

        })
        gameState.hatIcon.on('pointerout', function () {
          gameState.hatIcon.setFrame(0);
        })
        gameState.hatIcon.on('pointerup', () => {

          gameState.player.wearingHat = true;
          removeItemFromInventory('coin');
          addItemToInventory('cowboyHat');
          gameState.hatIcon.destroy();




        })
      }
    })
    if (gameState.player.wearingHat === true) {
      gameState.player.sprite!.anims.stop();
      gameState.player.sprite!.anims.play('catwalkingcowboy', true);
      gameState.player.sprite!.setInteractive();
      gameState.player.sprite!.on('pointerup', () => {
        gameState.player.wearingHat = false;
      })

    }
    if (gameState.player.wearingHat === false) {
     gameState.player.sprite!.anims.stop();
      gameState.player.sprite!.setFrame('sprite1');
      gameState.player.sprite!.anims.play('catwalking', true)

    }




    //phaser example code i used when first learning to setup a game, kept for sentimental reasons I guess? 
    /*
    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
*/
gameState.itemIcon = [];
     const addItemToInventory = (item) => {

      gameState.player.inventory!.push(item);
      let spaceX =650 - (gameState.player.inventory!.length)*50;
       gameState.itemIcon![item] = this.add.sprite(spaceX, 50, item);
    }

    const removeItemFromInventory = (item) => {
      gameState.player.inventory!.splice(gameState.player.inventory!.indexOf(item), 1);
      gameState.itemIcon![item].destroy()
       }
  

  }

  update() {

    


      // for (let item in gameState.player.inventory) {
      //   console.log(item);
      //   this.add.sprite(100, 100, gameState.player.inventory[item])
      // }

      if (gameState.cursors!.left.isDown) {
        gameState.player.sprite!.setVelocityX(-100);
        gameState.player.sprite!.flipX = false;
        if (gameState.player.wearingHat) {
          gameState.player.sprite!.anims.play('catwalkingcowboy', true)
          gameState.hatIcon.destroy();
        }
        else {
          gameState.player.sprite!.anims.play('catwalking', true)
        }



      }
      else if (gameState.cursors!.right.isDown) {
        gameState.player.sprite!.setVelocityX(100);
        gameState.player.sprite!.flipX = true;
        if (gameState.player.wearingHat) {
          gameState.player.sprite!.anims.play('catwalkingcowboy', true)
        }
        else {
          gameState.player.sprite!.anims.play('catwalking', true)
        }
      }

      else {
        gameState.player.sprite!.setVelocityX(0);
        gameState.player.sprite!.anims.stop();
        if (gameState.player.wearingHat) {
          gameState.player.sprite!.setFrame('sprite4');


        }




      }


      if (gameState.fireballRight) {
        gameState.fireballRight.setVelocityX(100)
      }


      this.input.keyboard.on('keydown-F', function () {
        if (gameState.player.sprite!.flipX) {
          gameState.fireballRight1 = gameState.fireballRight!.create(gameState.player.sprite!.x, gameState.player.sprite!.y, 'fireballRight').setGravityY(-200).setVeocityX(100)
        }
        else {
          gameState.fireballLeft1 = gameState.fireballLeft!.create(gameState.player.sprite!.x, gameState.player.sprite!.y, 'fireballLeft').setGravityY(-200).setVelocityX(-100);
        }
        if (gameState.fireballLeft1 || gameState.fireballRight1) {
        }

      }, this)








      if (gameState.cursors!.space.isDown) {
        if (isGrounded) {
          this.sound.add('jump');
          this.sound.play('jump', { loop: false })
          gameState.player.sprite!.setVelocityY(-100);
          isGrounded = false;

        }
        if (gameState.player.sprite!.body.velocity.y != 0) {

          isGrounded = false;
        }
        else {
          isGrounded = true;
        }
      }



    }



  }

