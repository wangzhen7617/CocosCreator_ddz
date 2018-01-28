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
            cc.director.loadScene('MainScene');

            let uniqueid=10000;
            uniqueid+=Math.floor(Math.random()*8);
            global.socket.login(uniqueid+"","大黄","http://www.baidu.com",function (err,data) {
               console.log(" login data = " +data);
               cc.director.loadScene('MainScene');
           })
        }
    },

    start () {
        // global.socket.init();
    }

    // update (dt) {},
});
