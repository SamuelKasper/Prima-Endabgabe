"use strict";
var Dodge;
(function (Dodge) {
    var f = FudgeCore;
    Dodge.speedIncrease = true;
    Dodge.bonusSpeedFromCoins = 0;
    class Character extends Dodge.QuadNode {
        constructor() {
            super("character", new f.Vector2(0, 0), new f.Vector2(1, 1));
            //variables
            this.jmpReady = true;
            this.speedCharacter = Dodge.externalData.configureAvatar.movementSpeed;
            this.allowMoveLeft = true;
            this.allowMoveRight = true;
            this.allowMoveTop = true;
            this.allowMoveDown = true;
            this.material = new f.Material("avatarMat", f.ShaderTexture, new f.CoatTextured(null, Character.texture));
            this.textureNode = new Dodge.QuadNode("textureNode", new f.Vector2(0, 0), new f.Vector2(1, 1));
            //moves the character
            this.moveCharacter = () => {
                let offset = this.speedCharacter * f.Loop.timeFrameReal / 1000;
                //move character
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
                //sprint
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
            //reset movement speed after sprint
            this.resetSpeed = () => {
                this.speedCharacter = Dodge.externalData.configureAvatar.movementSpeed + Dodge.bonusSpeedFromCoins;
            };
            //waiting for permission to sprint again
            this.waitForJmpReady = () => {
                this.jmpReady = true;
            };
            //remove material given from quadnote
            this.removeComponent(this.getComponent(f.ComponentMaterial));
            //add new image material
            this.textureNode.getComponent(f.ComponentMaterial).material = this.material;
            this.addChild(this.textureNode);
        }
        //load Texture
        static async loadCharacterTexture() {
            await Character.texture.load("./Images/Avatar.png");
        }
        //setting permission to move (allowMove...) to false
        disableMove(_direction) {
            switch (_direction) {
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
        enableMove(_direction) {
            switch (_direction) {
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
        //inrease character speed after collecting coins
        addBonusSpeed() {
            if (Dodge.speedIncrease) {
                if (this.speedCharacter < 30) {
                    this.speedCharacter = this.speedCharacter + Dodge.bonusSpeedFromCoins;
                    Dodge.speedIncrease = false;
                }
            }
        }
    }
    //static variable to load texture
    Character.texture = new f.TextureImage();
    Dodge.Character = Character;
})(Dodge || (Dodge = {}));
//# sourceMappingURL=Character.js.map