// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
import global from "./global"
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onClick(event,data){
        if(data=="login"){
            let unidqueID=global.playerManger.playerData.uniqueID;
            let nickName=global.playerManger.playerData.nickName;
            let avatarUrl=global.playerManger.playerData.avatarUrl;

            global.socket.login(unidqueID,nickName,avatarUrl,function (err,data) {
                if(err){
                    console.log('login err: '+err);
                }else{
                    console.log(" login data = " +data);
                    global.playerManger.playerData.loginSuccess(data);
                    cc.director.loadScene('mainScene');
                }
           });

        }
    },

    start () {
        // global.Socket.init();
    }

    // update (dt) {},
});
