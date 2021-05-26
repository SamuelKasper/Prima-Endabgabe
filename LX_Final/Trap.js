"use strict";
var Endabgabe;
(function (Endabgabe) {
    var f = FudgeCore;
    class Trap extends Endabgabe.QuadNode {
        constructor(x, y) {
            super("enemie", new f.Vector2(x, y), new f.Vector2(2, 2));
            this.activateTrap = () => {
                this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 0, 0, 1);
                Endabgabe.trapActive = true;
            };
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 1, 0, 1);
        }
    }
    Endabgabe.Trap = Trap;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Trap.js.map