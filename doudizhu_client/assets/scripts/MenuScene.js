// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

import  global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        idLabel:{
          default:null,
          type:cc.Label
        },
        nickNameLabel:{
            default:null,
            type:cc.Label
        },
        houseCardLabel:{
            default:null,
            type:cc.Label
        },
        avatarNode:{
            default:null,
            type:cc.Sprite
        },
        joinPrefab:{
            default:null,
            type:cc.Prefab
        },
        createPrefab:{
            default:null,
            type:cc.Prefab
        }
    },

    onLoad(){
        this.idLabel.string=global.playerManger.playerData.uid;
        this.nickNameLabel.string=global.playerManger.playerData.nickName;
        this.houseCardLabel.string=global.playerManger.playerData.houseCardCount;
        cc.loader.load({url:global.playerManger.playerData.avatarUrl,type:'png'}, (err, res) =>{
            if(err){
                console.log("load avatarUrl err:"+err);
            }else{
                let width=this.avatarNode.node.width;
                let height=this.avatarNode.node.height;
                this.avatarNode.spriteFrame=new cc.SpriteFrame(res);
                this.avatarNode.node.scale={
                    x:width/this.avatarNode.node.width,
                    y:height/this.avatarNode.node.height};
            }

        });
    },
    onClick (event, data) {
      switch (data){
          case 'createRoom':
              let createNode=cc.instantiate(this.createPrefab);
              createNode.parent=this.node;
              break;
          case 'joinRoom':
              let joinNode=cc.instantiate(this.joinPrefab);
              joinNode.parent=this.node;

              break;
          default:
              console.log('click data:'+data);
              break;
      }
    },

    start () {

    },

    // update (dt) {},
});
