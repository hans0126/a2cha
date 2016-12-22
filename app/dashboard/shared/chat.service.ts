import { Injectable } from '@angular/core';
import * as _ from "lodash";
import { GlobalValue } from '../../shared/global_value.service';
import { Io } from "../../shared/socket.service";

@Injectable()

export class Chat {

	 constructor(private globalValue: GlobalValue,private io:Io) {}

	 openRoom(obj:any){

	 	this.globalValue.currentRoom = this.globalValue.rooms[obj.roomid]	 	
	 	if(!obj.hasLoad){
	 		obj.hasLoad = true
	 		this.io.socket.emit('messagereq',JSON.stringify({ roomid: obj.roomid }))
	 	}
	 }
}