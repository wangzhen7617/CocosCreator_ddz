
import Socket from "./net/SocketUtil"
import PlayerManager from './entity/PlayerManager'

const global={};
global.socket=Socket();
global.playerManger=PlayerManager();


export default global;