
import PlayerData from './PlayerData'
const PlayerManager=function () {
    let that={};
    that.playerData=PlayerData();
    return that;
};
export  default  PlayerManager;