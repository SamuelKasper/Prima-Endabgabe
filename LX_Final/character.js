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
            //moves the character
            this.moveCharacter = () => {
                console.log("moving");
                let offset = this.speedCharacter * f.Loop.timeFrameReal / 1000;
                //Move character
                if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])) {
                    if (this.allowMoveLeft) {
                        this.mtxLocal.translateX(-offset);
                        this.setRectPosition();
                    }
                }
                if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT])) {
                    if (this.allowMoveRight) {
                        this.mtxLocal.translateX(+offset);
                        this.setRectPosition();
                    }
                }
                if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_UP])) {
                    if (this.allowMoveTop) {
                        this.mtxLocal.translateY(+offset);
                        this.setRectPosition();
                    }
                }
                if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN])) {
                    if (this.allowMoveDown) {
                        this.mtxLocal.translateY(-offset);
                        this.setRectPosition();
                    }
                }
                //Jump (actually increasing speed instead of "jumping")
                if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.SPACE])) {
                    if (this.jmpReady) {
                        this.speedCharacter = 50;
                        f.Time.game.setTimer(100, 1, this.resetSpeed);
                        this.jmpReady = false;
                        this.setRectPosition();
                        f.Time.game.setTimer(1000, 1, this.waitForJmpReady);
                    }
                }
            };
            //reset movement speed after "jump"
            this.resetSpeed = () => {
                this.speedCharacter = 4;
            };
            //waiting for permission to "jump" again
            this.waitForJmpReady = () => {
                this.jmpReady = true;
            };
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 1, 1, 1);
        }
        //setting permission to move (allowMove...) to false
        disableMove(direction) {
            switch (direction) {
                case "leftBorder":
                    this.allowMoveLeft = false;
                    break;
                case "rightBorder":
                    this.allowMoveRight = false;
                    break;
                case "topBorder":
                    this.allowMoveTop = false;
                    break;
                case "downBorder":
                    this.allowMoveDown = false;
                    break;
            }
        }
        //setting permission to move (allowMove...) to true
        enableMove(direction) {
            switch (direction) {
                case "leftBorder":
                    this.allowMoveLeft = true;
                    break;
                case "rightBorder":
                    this.allowMoveRight = true;
                    break;
                case "topBorder":
                    this.allowMoveTop = true;
                    break;
                case "downBorder":
                    this.allowMoveDown = true;
                    break;
            }
        }
    }
    LX_Final.Character = Character;
})(LX_Final || (LX_Final = {}));
//# sourceMappingURL=Character.js.map