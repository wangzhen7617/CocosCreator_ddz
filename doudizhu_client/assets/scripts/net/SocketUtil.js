
import Content from "../entity/Content"

const Socket=function () {
    let that={};
    let _socket=undefined;
    let _callBackIndex=1;
    let _callBackMap={};


    that.init=function () {
        _socket=io(Content.serverUrl);
        _socket.on("notify",function (data) {
            console.log('notify = '+JSON.stringify(data));
            let callBackIndex=data.callBackIndex;
            let cb=_callBackMap[callBackIndex];
            if(cb){
                console.log("receive callback ");
                if(data.data.err){
                    cb(data.data.err);
                }else{
                    cb(null,data.data);
                }
            }
        });


    };
    const request=function (msg ,data,cb) {
        console.log(" request msg = "+msg+"  data"+JSON.stringify(data));
        _callBackMap[_callBackIndex]=cb;
        notify(msg,data);
    };
    const notify=function (msg,data) {
        _socket.emit("notify",{msg:msg,callBackIndex:_callBackIndex,data:data});
        _callBackIndex++;

    };
    that.login=function (uniqueID,nickName,avatar,cb) {
        request("login",{uniqueID:uniqueID,nickName:nickName,avatar:avatar},cb);
    };
    that.createRoom=function (data,cb) {
        request("create_room",data,cb);
    };
    that.joinRoom=function (roomId, cb) {
        request("join_room",{roomId:roomId},cb)
    };
    return that;

};
export default Socket;
