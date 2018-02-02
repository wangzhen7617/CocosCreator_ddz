

const roomData=require('../game/room');

let  _roomList=[];
exports.createRoom=function (data, cb) {
    let roomID='';
    for (let i =0;i<6;i++){
        roomID+=Math.floor(Math.random()*10);
    }
    let room=roomData(roomID,data);
    if(cb) {
        cb(null,roomID);
    }

};
exports.joinRoom=function (roomID, player, cb) {
    for(let i=0;i<_roomList.length;i++){
        let room=_roomList[i];
        if(room.roomID===roomID){
            room.joinPlayer(player,cb){
                return;
            }
        }
    }
    if(cb){
        cb('no this room')
    }
};