namespace LX_Final {
    import fc = FudgeCore;
    export class QuadNode extends fc.Node {
        static mesh: fc.Mesh = new fc.MeshQuad("Quad");
        static material: fc.Material = new fc.Material("white", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 1, 1, 1)));
        public rect: fc.Rectangle;

        constructor(_name: string, _pos: fc.Vector2, _scale: fc.Vector2) {
            super(_name);

            this.addComponent(new fc.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);

            let cmpMesh: fc.ComponentMesh = new fc.ComponentMesh(QuadNode.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            this.addComponent(cmpMesh);

            this.addComponent(new fc.ComponentMaterial(QuadNode.material));

            this.rect = new fc.Rectangle(_pos.x, _pos.y, _scale.x, _scale.y, fc.ORIGIN2D.CENTER);
        }

        public checkCollision(_target: QuadNode): boolean {
            return this.rect.collides(_target.rect);
        }

        public setRectPosition(): void {
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
        }


    }

}