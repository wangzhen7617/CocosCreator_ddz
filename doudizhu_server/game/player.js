const roomManager=require('../utils/roomManager');
const Player=function (socket, data) {
    let that={};
    let _socket=socket;
    let _uid=data.uid;
    let _nickName=data.nickName;
    let _avatarUrl=data.avatarUrl;
    let _houseCardCount=data.houseCardCount;

    const notify=function (msg, index, data) {
        _socket.emit('notify',{
            msg:msg,
            callBackIndex:index,
            data:data
        })
    };
    notify('login',data.callBackIndex,{
        uid:_uid,
        nickName:_nickName,
        avatarUrl:_avatarUrl,
        houseCardCount:_houseCardCount
    });
    _socket.on('notify',function (data) {
        let msg=data.msg;
        let callBackIndex=data.callBackIndex;
        let d_data=data.data;
        console.log('data= '+JSON.stringify(d_data));
        switch(msg){
            case 'create_room':
                roomManager.createRoom(d_data,function (err, resp) {
                    if(err){
                        console.log('create room err: '+err);
                    }else{
                        notify('create_room',callBackIndex,{roomID:resp});
                    }
                });
                break;
            case 'join_room':
                roomManager.joinRoom(d_data.roomID,that,function (err, resp) {
                    notify('join_room',callBackIndex,{err:err,data:resp});
                });
                break;
            default:
                break;
        }
    });

    return that;


};
let _playerList=[];
exports.createPlayer=function (sokcet, data) {
    console.log('create player ='+ JSON.stringify(data));
    let player =new Player(sokcet,data);
    _playerList.push(player);
};