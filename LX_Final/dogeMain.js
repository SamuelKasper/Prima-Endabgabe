"use strict";
var LX_Final;
(function (LX_Final) {
    var f = FudgeCore;
    window.addEventListener("load", init);
    let viewport = new f.Viewport();
    //Root Node
    let rootNode = new f.Node("root");
    //Character Node
    let characterNode;
    //Enemie Node
    let enemieNode;
    //Trap Node
    let trapNode;
    LX_Final.trapActive = false;
    //Coin Node
    let coinNode;
    //mapBorder
    let mapBorderNode = new f.Node("borderNode");
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
    //time
    let timer;
    //buttons
    let startBtn;
    let resetBtn;
    //gamestate
    let gameState;
    function init() {
        //Canvas holen und speichern
        const canvas = document.querySelector("canvas");
        //start button init
        startBtn = document.getElementById("startBtn");
        //reset button init
        resetBtn = document.getElementById("resetBtn");
        //set gamestate
        setGameState("waiting for start");
        //create and move camera
        let comCamera = new f.ComponentCamera();
        comCamera.mtxPivot.translateZ(40);
        comCamera.mtxPivot.translateY(0);
        comCamera.mtxPivot.rotateY(180);
        //creating children and adding them to rootNode
        characterNode = new LX_Final.Character();
        rootNode.addChild(characterNode);
        enemieNode = new LX_Final.Enemie();
        rootNode.addChild(enemieNode);
        addChildMapBorder();
        rootNode.addChild(mapBorderNode);
        viewport.initialize("Viewport", rootNode, comCamera, canvas);
        viewport.draw();
        //add actionlistener on start button 
        startBtn.addEventListener("click", hndStartButton);
        //add actionlistener on reset button 
        resetBtn.addEventListener("click", hndResetButton);
    }
    function hndStartButton() {
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 60);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        setGameState("running");
        timer = new f.Time();
        startIncreasingSpeed();
        startSettingTraps();
        startPlacingCoins();
        updateScore();
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
        updateTime();
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
        }
        /* collision character - trap */
        if (characterNode.checkCollision(trapNode)) {
            if (LX_Final.trapActive) {
                setGameState("over");
                f.Loop.stop();
                let gameoverText = document.createElement("p");
                gameoverText.innerHTML = "Game Over";
                document.getElementById("gameover").appendChild(gameoverText);
            }
        }
        /* collision character - coin */
        if (characterNode.checkCollision(coinNode)) {
            rootNode.removeChild(coinNode);
            //cut off everything except bevor =
            let scoreString = document.getElementById("score").innerHTML;
            let stringParts = scoreString.split(":");
            console.log(stringParts[1]);
            //convert number to type number
            let score = parseInt(stringParts[1]);
            //set new score
            score += 5;
            document.getElementById("score").innerHTML = "score: " + score.toString();
        }
    }
    //set time in html
    function updateTime() {
        let timeObject = document.getElementById("time");
        let timeInSeconds = Math.floor(timer.get() / 1000);
        let seconds = timeInSeconds % 60;
        let minuts = Math.floor(timeInSeconds / 60);
        timeObject.innerHTML = "timer: " + minuts + ":" + seconds;
    }
    //set score in html
    function updateScore() {
        if (!gameState.includes("over")) {
            //cut off everything except bevor =
            let scoreString = document.getElementById("score").innerHTML;
            let stringParts = scoreString.split(":");
            console.log(stringParts[1]);
            //convert number to type number
            let score = parseInt(stringParts[1]);
            //set new score
            score++;
            document.getElementById("score").innerHTML = "score: " + score.toString();
            f.Time.game.setTimer(3000, 1, updateScore);
        }
    }
    //increase enemie speed after 10 sec
    function startIncreasingSpeed() {
        enemieNode.increaseSpeed();
        if (!gameState.includes("over")) {
            f.Time.game.setTimer(10000, 1, startIncreasingSpeed);
        }
    }
    //setting gameState
    function setGameState(state) {
        gameState = state;
        document.getElementById("state").innerHTML = "Gamestate: " + gameState;
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
        if (!gameState.includes("over")) {
            f.Time.game.setTimer(1500, 1, trapNode.activateTrap);
            f.Time.game.setTimer(5000, 1, startSettingTraps);
        }
    }
    //placing coins
    function startPlacingCoins() {
        if (coinNode) {
            rootNode.removeChild(coinNode);
        }
        else {
            console.log("no coinNode found");
        }
        coinNode = new LX_Final.Coins(getRandomPosition(), getRandomPosition());
        rootNode.addChild(coinNode);
        if (!gameState.includes("over")) {
            f.Time.game.setTimer(4000, 1, startPlacingCoins);
        }
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