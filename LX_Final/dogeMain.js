"use strict";
var LX_Final;
(function (LX_Final) {
    var f = FudgeCore;
    window.addEventListener("load", init);
    let viewport = new f.Viewport();
    let rootNode = new f.Node("root");
    let characterNode;
    let enemieNode;
    let trapNode;
    let coinNode;
    let scoreIncrease = true;
    let sound;
    let mapBorderNode;
    let leftMapBoarder;
    let rightMapBoarder;
    let topMapBoarder;
    let downMapBoarder;
    let leftBorderPosition = new f.Vector2(-16, 0);
    let rightBorderPosition = new f.Vector2(16, 0);
    let topBorderPosition = new f.Vector2(0, 16);
    let downBorderPosition = new f.Vector2(0, -16);
    let horizontalSize = new f.Vector2(1, 33);
    let verticalSize = new f.Vector2(32, 1);
    let startBtn;
    let resetBtn;
    let timescore;
    LX_Final.trapActive = false;
    function init() {
        const canvas = document.querySelector("canvas");
        startBtn = document.getElementById("startBtn");
        resetBtn = document.getElementById("resetBtn");
        //set gamestate
        setGameState("waiting for start");
        //create and position camera
        let comCamera = new f.ComponentCamera();
        comCamera.mtxPivot.translateZ(40);
        comCamera.mtxPivot.translateY(0);
        comCamera.mtxPivot.rotateY(180);
        //creating children and adding them to rootNode
        sound = new LX_Final.Sounds();
        characterNode = new LX_Final.Character();
        enemieNode = new LX_Final.Enemie();
        mapBorderNode = new f.Node("borderNode");
        addChildMapBorder();
        rootNode.addChild(enemieNode);
        rootNode.addChild(characterNode);
        rootNode.addChild(mapBorderNode);
        //initialize viewport
        viewport.initialize("Viewport", rootNode, comCamera, canvas);
        viewport.draw();
        //adding listener to buttons
        startBtn.addEventListener("click", hndStartButton);
        resetBtn.addEventListener("click", hndResetButton);
    }
    function hndStartButton() {
        sound.playBackgroundMusic(true);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 60);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        setGameState("running");
        timescore = new LX_Final.TimeScore();
        enemieNode.startIncreasingSpeed();
        startSettingTraps();
        startPlacingCoins();
        timescore.updateScore();
        startBtn.blur(); //remove focus on button
        startBtn.disabled = true;
    }
    function hndResetButton() {
        location.reload();
    }
    function update(_event) {
        characterNode.moveCharacter();
        checkCollision();
        enemieNode.moveEnemie();
        timescore.updateTime();
        viewport.draw();
    }
    //setting up map borders and adding them as child
    function addChildMapBorder() {
        leftMapBoarder = new LX_Final.MapBorder("leftBorder", leftBorderPosition, horizontalSize);
        rightMapBoarder = new LX_Final.MapBorder("rightBorder", rightBorderPosition, horizontalSize);
        topMapBoarder = new LX_Final.MapBorder("topBorder", topBorderPosition, verticalSize);
        downMapBoarder = new LX_Final.MapBorder("downBorder", downBorderPosition, verticalSize);
        mapBorderNode.addChild(leftMapBoarder);
        mapBorderNode.addChild(rightMapBoarder);
        mapBorderNode.addChild(topMapBoarder);
        mapBorderNode.addChild(downMapBoarder);
    }
    //checking collision
    function checkCollision() {
        for (let border of mapBorderNode.getChildren()) {
            /* collision character - border */
            if (border.checkCollision(characterNode)) {
                //if collision
                characterNode.disableMove(border.name);
            }
            else {
                //if no collision
                characterNode.enableMove(border.name);
            }
            /* collision enemie - border */
            if (border.checkCollision(enemieNode)) {
                enemieNode.toggleDirection(border.name);
            }
        }
        /* collision character - enemie */
        if (characterNode.checkCollision(enemieNode)) {
            setGameState("over");
            f.Loop.stop();
            let gameoverText = document.createElement("p");
            gameoverText.innerHTML = "Game Over";
            document.getElementById("gameover").appendChild(gameoverText);
            sound.playBackgroundMusic(false);
        }
        /* collision character - trap */
        if (characterNode.checkCollision(trapNode)) {
            if (LX_Final.trapActive) {
                setGameState("over");
                f.Loop.stop();
                let gameoverText = document.createElement("p");
                gameoverText.innerHTML = "Game Over";
                document.getElementById("gameover").appendChild(gameoverText);
                sound.playBackgroundMusic(false);
            }
        }
        /* collision character - coin */
        if (characterNode.checkCollision(coinNode)) {
            sound.playSound(LX_Final.SoundList.collectCoin);
            rootNode.removeChild(coinNode);
            //ScoreIncrease to prevent multiple increases of score at the same coin
            if (scoreIncrease) {
                //cut off everything except bevor =
                let scoreString = document.getElementById("score").innerHTML;
                let stringParts = scoreString.split(":");
                console.log(stringParts[1]);
                //convert number to type number
                let score = parseInt(stringParts[1]);
                //set new score
                score += 3;
                document.getElementById("score").innerHTML = "score: " + score.toString();
                scoreIncrease = false;
            }
        }
    }
    //setting gameState
    function setGameState(state) {
        LX_Final.gameState = state;
        document.getElementById("state").innerHTML = "Gamestate: " + LX_Final.gameState;
    }
    //setting Traps at the players position
    function startSettingTraps() {
        //remove recent trap and disable trapActive
        rootNode.removeChild(trapNode);
        LX_Final.trapActive = false;
        //create trapNode and add to root
        trapNode = new LX_Final.Trap(characterNode.mtxLocal.translation.x, characterNode.mtxLocal.translation.y);
        rootNode.addChild(trapNode);
        //activate trap after 1 second and start timer for the next trap
        if (!LX_Final.gameState.includes("over")) {
            f.Time.game.setTimer(1500, 1, trapNode.activateTrap);
            f.Time.game.setTimer(5000, 1, startSettingTraps);
        }
    }
    //placing coins
    function startPlacingCoins() {
        //remove coinNode if existing
        if (coinNode) {
            rootNode.removeChild(coinNode);
        }
        //create new coin at random position
        coinNode = new LX_Final.Coins(getRandomPosition(), getRandomPosition());
        rootNode.addChild(coinNode);
        //repeat if not game over
        if (!LX_Final.gameState.includes("over")) {
            f.Time.game.setTimer(4000, 1, startPlacingCoins);
        }
        scoreIncrease = true;
    }
    //generate random number between -15.5 and 15.5
    function getRandomPosition() {
        let sign = Math.floor(Math.random() * 10);
        let rnd;
        if (sign % 2 == 0) {
            rnd = Math.floor(Math.random() * (15.5));
        }
        else {
            rnd = Math.floor(Math.random() * (-15.5));
        }
        return rnd;
    }
})(LX_Final || (LX_Final = {}));
//# sourceMappingURL=DogeMain.js.map