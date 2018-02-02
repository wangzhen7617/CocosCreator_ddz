let PlayerData=function () {
    let that={};
    that.uid='100000';
    that.uniqueID='10000';
    that.nickName='佳佳';
    that.avatarUrl='http://wx.qlogo.cn/mmhead/GibvHudxmlJaEFNUaHjFUnibpqTCXeKoKGK1RV8jr5k7kictTywJaY2icg/0';
    that.houseCardCount=0;


    that.loginSuccess=function (data) {
        that.uid=data.uid;
        that.nickName=data.nickName;
        that.uniqueID=data.uniqueID;
        that.avatarUrl=data.avatarUrl;
        that.houseCardCount=data.houseCardCount;
    };
    that.setWeiChatData=function (data) {
        that.nickName=data.nickName;
        that.uniqueID=data.uniqueID;
        that.avatarUrl=data.avatarUrl;
    };
    return that;
};
export default PlayerData;