"use strict";
var LX_Final;
(function (LX_Final) {
    var f = FudgeCore;
    class Character extends LX_Final.QuadNode {
        constructor() {
            super("character", new f.Vector2(0, 0), new f.Vector2(1, 1));
            //Variables
            this.jmpReady = true;
            this.speedCharacter = 4;
            this.allowMoveLeft = true;
            this.allowMoveRight = true;
            this.allowMoveTop = true;
            this.allowMoveDown = true;
            this.moveCharacter = () => {
                let offset = this.speedCharacter * f.Loop.timeFrameReal / 1000;
                //console.log(this.allowMoveLeft, " ", this.allowMoveRight, " ", this.allowMoveTop, " ", this.allowMoveDown); 
                //Move character
                if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])) {
                    if (this.allowMoveLeft) {
                        this.mtxLocal.translateX(-offset);
                        this.lastDiretionCharacter = "left";
                        this.setRectPosition();
                    }
                }
                if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT])) {
                    if (this.allowMoveRight) {
                        this.mtxLocal.translateX(+offset);
                        this.lastDiretionCharacter = "right";
                        this.setRectPosition();
                    }
                }
                if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_UP])) {
                    if (this.allowMoveTop) {
                        this.mtxLocal.translateY(+offset);
                        this.lastDiretionCharacter = "up";
                        this.setRectPosition();
                    }
                }
                if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN])) {
                    if (this.allowMoveDown) {
                        this.mtxLocal.translateY(-offset);
                        this.lastDiretionCharacter = "down";
                        this.setRectPosition();
                    }
                }
                //Springen
                if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.SPACE])) {
                    if (this.jmpReady) {
                        switch (this.lastDiretionCharacter) {
                            case "left":
                                this.mtxLocal.translateX(-5);
                                break;
                            case "right":
                                this.mtxLocal.translateX(5);
                                break;
                            case "up":
                                this.mtxLocal.translateY(5);
                                break;
                            case "down":
                                this.mtxLocal.translateY(-5);
                                break;
                        }
                        this.jmpReady = false;
                        this.setRectPosition();
                        f.Time.game.setTimer(1000, 1, this.waitForJmpReady);
                    }
                }
            };
            this.waitForJmpReady = () => {
                this.jmpReady = true;
            };
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 1, 1, 1);
        }
        disableMove(direction) {
            switch (direction) {
                case "left":
                    this.allowMoveLeft = false;
                    break;
                case "right":
                    this.allowMoveRight = false;
                    break;
                case "top":
                    this.allowMoveTop = false;
                    break;
                case "down":
                    this.allowMoveDown = false;
                    break;
            }
        }
        enableMove() {
            this.allowMoveLeft = true;
            this.allowMoveRight = true;
            this.allowMoveTop = true;
            this.allowMoveDown = true;
        }
    }
    LX_Final.Character = Character;
})(LX_Final || (LX_Final = {}));
//# sourceMappingURL=Character.js.map