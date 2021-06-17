"use strict";
var Dodge;
(function (Dodge) {
    var f = FudgeCore;
    let SoundList;
    (function (SoundList) {
        SoundList[SoundList["collectCoin"] = 0] = "collectCoin";
        SoundList[SoundList["settingTrap"] = 1] = "settingTrap";
    })(SoundList = Dodge.SoundList || (Dodge.SoundList = {}));
    class Sounds {
        constructor() {
            this.music = new f.Audio("Audio/Final.mp3");
            this.cmpBackgroundMusic = new f.ComponentAudio(this.music, true, false);
            this.cmpBackgroundMusic.connect(true);
            this.cmpBackgroundMusic.volume = 0.5;
            this.coin = new f.Audio("Audio/CoinSoundE.mp3");
            this.cmpCoinSound = new f.ComponentAudio(this.coin, false, false);
            this.cmpCoinSound.connect(true);
            this.cmpCoinSound.volume = 0.5;
        }
        playSound(_sound) {
            if (_sound == SoundList.collectCoin) {
                this.cmpCoinSound.play(true);
            }
        }
        playBackgroundMusic(_state) {
            this.cmpBackgroundMusic.play(_state);
        }
    }
    Dodge.Sounds = Sounds;
})(Dodge || (Dodge = {}));
//# sourceMappingURL=Sounds.js.map