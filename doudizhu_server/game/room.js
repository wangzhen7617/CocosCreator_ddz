const roomConfig=require("./../room_rule_config.json");

const room=function (roomID, data) {
    let that={};
    let _roomID=roomID;
    let _playerList=[];





    that.joinPlayer=function (player, cb) {
        console.log('room join player');
        if(cb){
            cb(null,data);
        }
        _playerList.push(player);
    };
    Object.defineProperty(that,"roomID",{
        get:function () {
            return _roomID;
        }
    });
    return that;
};
module.exports=room;
