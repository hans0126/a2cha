import { Injectable, EventEmitter } from '@angular/core';
import * as _ from "lodash";
import { GlobalValue } from '../../shared/global_value.service';
import { Io } from "../../shared/socket.service";




@Injectable()

export class Chat {
	public clearTextEvent:EventEmitter<any>
    constructor(private globalValue: GlobalValue, private io: Io ) {    
    	this.clearTextEvent = new EventEmitter();
    }

    openRoom(obj: any) {
    	this.clearTextEvent.emit()
        this.globalValue.currentRoom = obj
        if (!obj.hasLoad) {
            obj.hasLoad = true
            this.io.socket.emit('messagereq', JSON.stringify({ roomid: obj.roomId }))
        }
    }
   
}


