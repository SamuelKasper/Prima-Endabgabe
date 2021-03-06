namespace Dodge {
    import f = FudgeCore;
    export class Trap extends QuadNode {
        private textureTrap: f.TextureImage = new f.TextureImage("./Images/Trap.png");
        private materialTrap: f.Material = new f.Material("materialTrap", f.ShaderTexture, new f.CoatTextured(null, this.textureTrap));
        private textureSpike: f.TextureImage = new f.TextureImage("./Images/Spike.png");
        private materialSpike: f.Material = new f.Material("materialTrap", f.ShaderTexture, new f.CoatTextured(null, this.textureSpike));
        private textureNode: QuadNode = new QuadNode("textureNode", new f.Vector2(0, 0), new f.Vector2(2, 2));

        constructor(_x: number, _y: number) {
            super("trap", new f.Vector2(_x, _y), new f.Vector2(2, 2));
            //remove material given from quadnote
            this.removeComponent(this.getComponent(f.ComponentMaterial));
            //add new image material
            this.textureNode.getComponent(f.ComponentMaterial).material = this.materialTrap;
            this.addChild(this.textureNode);
            this.setRectPosition();
        }

        public activateTrap = (): void => {
            //add new image material
            this.textureNode.getComponent(f.ComponentMaterial).material = this.materialSpike;
            trapActive = true;
        }

    }
}