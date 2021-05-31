"use strict";
var Endabgabe;
(function (Endabgabe) {
    var f = FudgeCore;
    class Coins extends Endabgabe.QuadNode {
        constructor(x, y) {
            super("coin", new f.Vector2(x, y), new f.Vector2(1, 1));
            this.texture = new f.TextureImage("./Images/Coin.png");
            this.material = new f.Material("coinMat", f.ShaderTexture, new f.CoatTextured(null, this.texture));
            this.textureNode = new Endabgabe.QuadNode("textureNode", new f.Vector2(0, 0), new f.Vector2(1, 1));
            //remove material given from quadnote
            this.removeComponent(this.getComponent(f.ComponentMaterial));
            //add new image material
            this.textureNode.getComponent(f.ComponentMaterial).material = this.material;
            this.addChild(this.textureNode);
        }
    }
    Endabgabe.Coins = Coins;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Coins.js.map