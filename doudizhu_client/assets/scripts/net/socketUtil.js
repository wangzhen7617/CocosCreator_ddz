
import Content from "./../entity/content"

const socket=function () {
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
                cb(null,data.data);
            }
        });


    };
    const request=function (msg ,data,cb) {
        console.log(" callback index = "+_callBackIndex);
        _callBackMap[_callBackIndex]=cb;
        notify(msg,data);
    };
    const notify=function (msg,data) {
        console.log("callback index ="+_callBackIndex);
        _socket.emit("notify",{msg:msg,callBackIndex:_callBackIndex,data:data});
        _callBackIndex++;

    };
    that.login=function (uniqueID,nickName,avatar,cb) {
        request("login",{uniqueID:uniqueID,nickName:nickName,avatar:avatar},cb);
    };
    return that;
};
export default socket;
