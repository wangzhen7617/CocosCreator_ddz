// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        labelList:{
            default:[],
            type:cc.Label
        }
    },
    onNumClick:function (event, customData) {
        console.log('num click :'+customData);
        if(customData==='close'){
            this.node.destroy();
        }else if(customData==='del'){
            this.numString=this.numString.slice(0,this.numString.length-1);
        }else if(customData==='reset'){
            this.numString="";
        }else{
            let string="";
            string=this.numString
            string+=customData;
            if(string.length>5){
                string=string.slice(0,5);
            }
            this.numString=string;
            if(this.numString.length===6){
                console.log("do join room");
            }
        }
    },

    start () {
        this.numString="";

    },

    update (dt) {
        for(let i=0;i<this.labelList.length;i++){
            this.labelList[i].string="";
        }
        for(let i=0;i<this.numString.length;i++){
            this.labelList[i].string=this.numString[i];
        }
    },
});
