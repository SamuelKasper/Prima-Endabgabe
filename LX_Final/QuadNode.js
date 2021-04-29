"use strict";
var LX_Final;
(function (LX_Final) {
    var fc = FudgeCore;
    class QuadNode extends fc.Node {
        constructor(_name, _pos, _scale) {
            super(_name);
            this.addComponent(new fc.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            let cmpMesh = new fc.ComponentMesh(QuadNode.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            this.addComponent(cmpMesh);
            this.addComponent(new fc.ComponentMaterial(QuadNode.material));
            this.rect = new fc.Rectangle(_pos.x, _pos.y, _scale.x, _scale.y, fc.ORIGIN2D.CENTER);
        }
        checkCollision(_target) {
            return this.rect.collides(_target.rect);
        }
        setRectPosition() {
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
        }
    }
    QuadNode.mesh = new fc.MeshQuad("Quad");
    QuadNode.material = new fc.Material("white", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 1, 1, 1)));
    LX_Final.QuadNode = QuadNode;
})(LX_Final || (LX_Final = {}));
//# sourceMappingURL=QuadNode.js.map