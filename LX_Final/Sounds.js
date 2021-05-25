"use strict";
var LX_Final;
(function (LX_Final) {
    var f = FudgeCore;
    let SoundList;
    (function (SoundList) {
        SoundList[SoundList["collectCoin"] = 0] = "collectCoin";
        SoundList[SoundList["settingTrap"] = 1] = "settingTrap";
    })(SoundList = LX_Final.SoundList || (LX_Final.SoundList = {}));
    class Sounds {
        constructor() {
            this.music = new f.Audio("Audio/Final.mp3");
            this.cmpBackgroundMusic = new f.ComponentAudio(this.music, true, false);
            this.cmpBackgroundMusic.connect(true);
            this.cmpBackgroundMusic.volume = 1;
            this.coin = new f.Audio("Audio/CoinSoundE.mp3");
            this.cmpCoinSound = new f.ComponentAudio(this.coin, false, false);
            this.cmpCoinSound.connect(true);
            this.cmpCoinSound.volume = 1;
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
    LX_Final.Sounds = Sounds;
})(LX_Final || (LX_Final = {}));
//# sourceMappingURL=Sounds.js.map