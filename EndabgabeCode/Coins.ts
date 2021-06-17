namespace Dodge {
    import f = FudgeCore;
    export class Coins extends QuadNode {
        private texture: f.TextureImage = new f.TextureImage("./Images/Coin.png");
        private material: f.Material = new f.Material("coinMat", f.ShaderTexture, new f.CoatTextured(null, this.texture));
        private textureNode: QuadNode = new QuadNode("textureNode", new f.Vector2(0, 0), new f.Vector2(1, 1));
        
        constructor(x: number, y: number) {
            super("coin", new f.Vector2(x, y), new f.Vector2(1, 1));
            //remove material given from quadnote
            this.removeComponent(this.getComponent(f.ComponentMaterial));
            //add new image material
            this.textureNode.getComponent(f.ComponentMaterial).material = this.material;
            this.addChild(this.textureNode);
        }
    }
}