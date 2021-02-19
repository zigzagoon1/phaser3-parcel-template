import Phaser from 'phaser';


export class Item {
    private _name: string;
    private _value: any;
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    get value() {
        return this._value;
    }
    set value() {}
   
    addItemToInventory = (item) => {
      gameState.player.inventory.push(item);
      let spaceX =650 - (gameState.player.inventory.length)*50;
      gameState.itemIcon[item] = this.add.sprite(spaceX, 50, item);
    }

    removeItemFromInventory = (item) => {
      gameState.player.inventory.splice(gameState.player.inventory.indexOf(item), 1);
      gameState.itemIcon[item].destroy()
       }
}


