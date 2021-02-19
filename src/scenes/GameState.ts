// export default class GameState {
//     constructor() {

//     }
// }

export default class GameState {
  hatIcon?: any
  player: Player
  testAlien?: any
  coin?: Phaser.Physics.Arcade.Group
  coin1?: any
  cowboyHat?: Phaser.GameObjects.Group
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  fireButton?: Phaser.Input.Keyboard.Key
  fireballLeft?: Phaser.Physics.Arcade.Group
  fireballRight?: Phaser.Physics.Arcade.Group
  items?: string[]
  other: any
  fireballLeft1?: any
  fieballRight1?: any
  itemIcon?: any[]
  fireballRight1?: any

  constructor() {
    this.player = new Player()
    this.other = {}
  }
}

export class Player {
  sprite?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  wearingHat?: Boolean
  inventory?: Array<any>
  walking?: false | Phaser.Animations.Animation
  cowboyAnimation?: false | Phaser.Animations.Animation
  constructor() {
    //   this.sprite
  }
}
