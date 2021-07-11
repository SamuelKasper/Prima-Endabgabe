"use strict";
var Dodge;
(function (Dodge) {
    var f = FudgeCore;
    class Coins extends Dodge.QuadNode {
        constructor(_x, _y) {
            super("coin", new f.Vector2(_x, _y), new f.Vector2(1, 1));
            this.texture = new f.TextureImage("./Images/Coin.png");
            this.material = new f.Material("coinMat", f.ShaderTexture, new f.CoatTextured(null, this.texture));
            this.textureNode = new Dodge.QuadNode("textureNode", new f.Vector2(0, 0), new f.Vector2(1, 1));
            //remove material given from quadnote
            this.removeComponent(this.getComponent(f.ComponentMaterial));
            //add new image material
            this.textureNode.getComponent(f.ComponentMaterial).material = this.material;
            this.addChild(this.textureNode);
        }
    }
    Dodge.Coins = Coins;
})(Dodge || (Dodge = {}));
//# sourceMappingURL=Coins.js.map