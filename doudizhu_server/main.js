
const socket=require('socket.io');
const  server=socket('3000');
const config=require('./config');
const db=require('./utils/db');
db.connect(config.mysqlConfig);
const playerController=require('./game/player');

// db.checkPlayer("10000",function (err,data) {
//
//
// });

// db.insertPlayerInfo({
//     unique_id:"10000",
//     uid:"10000",
//     nick_name:"小明",
//     avatar_url:"wwww.baidu.com",
//     house_card_count:5
// });



server.on("connection",function (socket) {
    console.log("a user connect success");
    socket.emit('connectSuccess','hello world');
    socket.on("notify",function(data){
        console.log("a user login = "+JSON.stringify(data));
        let requestData=data.data;
        let requestMsg=data.msg;
        let requestCallBackIndex=data.callBackIndex;

        switch(requestMsg){
            case "login":{
                db.checkPlayer(requestData.uniqueID,function (err,data) {
                    if(err){
                        console.log('err = '+err);
                    }else{
                        if(data.length===0){
                            console.log("不存在这个玩家");
                            let uid='1';
                            for (let i=0;i<7;i++){
                                uid+=Math.floor(Math.random()*10);
                            }
                            db.insertPlayerInfo({
                                unique_id:requestData.uniqueID,
                                uid:uid,
                                nick_name:requestData.nickName,
                                avatar_url:requestData.avatar,
                                house_card_count:5
                            });
                            playerController.createPlayer(socket,{
                                uid:uid,
                                nickName:requestData.nickName,
                                avatarUrl:requestData.avatar,
                                houseCardCount:5,
                                callBackIndex:requestCallBackIndex

                            });
                        }else{
                            console.log("存在玩家 更新玩家信息");
                            db.updatePlayerInfo('unique_id',requestData.uniqueID,{
                                nick_name:requestData.nickName,
                                avatar_url:requestData.avatar
                            });
                            playerController.createPlayer(socket,{
                                uid:data[0].uid,
                                nickName:requestData.nickName,
                                avatarUrl:requestData.avatar,
                                houseCardCount:data[0].house_card_count,
                                callBackIndex:requestCallBackIndex
                            })
                        }
                    }
                });
                break;
            }
        }
    })
});

console.log("listen on 3000");

