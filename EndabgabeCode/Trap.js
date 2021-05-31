"use strict";
var Endabgabe;
(function (Endabgabe) {
    var f = FudgeCore;
    class Trap extends Endabgabe.QuadNode {
        constructor(x, y) {
            super("trap", new f.Vector2(x, y), new f.Vector2(2, 2));
            this.textureTrap = new f.TextureImage("./Images/Trap.png");
            this.materialTrap = new f.Material("materialTrap", f.ShaderTexture, new f.CoatTextured(null, this.textureTrap));
            this.textureSpike = new f.TextureImage("./Images/Spike.png");
            this.materialSpike = new f.Material("materialTrap", f.ShaderTexture, new f.CoatTextured(null, this.textureSpike));
            this.textureNode = new Endabgabe.QuadNode("textureNode", new f.Vector2(0, 0), new f.Vector2(2, 2));
            this.activateTrap = () => {
                //add new image material
                this.textureNode.getComponent(f.ComponentMaterial).material = this.materialSpike;
                Endabgabe.trapActive = true;
            };
            //remove material given from quadnote
            this.removeComponent(this.getComponent(f.ComponentMaterial));
            //add new image material
            this.textureNode.getComponent(f.ComponentMaterial).material = this.materialTrap;
            this.addChild(this.textureNode);
        }
    }
    Endabgabe.Trap = Trap;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Trap.js.map