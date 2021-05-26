"use strict";
var Endabgabe;
(function (Endabgabe) {
    var f = FudgeCore;
    class Character extends Endabgabe.QuadNode {
        constructor() {
            super("character", new f.Vector2(0, 0), new f.Vector2(1, 1));
            //Variables
            this.jmpReady = true;
            this.speedCharacter = Endabgabe.externalData.configureAvatar.movementSpeed;
            this.allowMoveLeft = true;
            this.allowMoveRight = true;
            this.allowMoveTop = true;
            this.allowMoveDown = true;
            //moves the character
            this.moveCharacter = () => {
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
                this.speedCharacter = Endabgabe.externalData.configureAvatar.movementSpeed;
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
                    //if behind border move back
                    if (this.mtxLocal.translation.x < -15.05) {
                        this.mtxLocal.translateX(0.05);
                    }
                    break;
                case "rightBorder":
                    this.allowMoveRight = false;
                    //if behind border move back
                    if (this.mtxLocal.translation.x > 15.05) {
                        this.mtxLocal.translateX(-0.05);
                    }
                    break;
                case "topBorder":
                    this.allowMoveTop = false;
                    //if behind border move back
                    if (this.mtxLocal.translation.y > 15.05) {
                        this.mtxLocal.translateY(-0.05);
                    }
                    break;
                case "downBorder":
                    this.allowMoveDown = false;
                    //if behind border move back
                    if (this.mtxLocal.translation.y < -15.05) {
                        this.mtxLocal.translateY(0.05);
                    }
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
    Endabgabe.Character = Character;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Character.js.map