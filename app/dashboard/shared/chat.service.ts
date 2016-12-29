import { Injectable, EventEmitter } from '@angular/core';
import * as _ from "lodash";
import { GlobalValue } from '../../shared/global_value.service';
import { Io } from "../../shared/socket.service";




@Injectable()

export class Chat {
    public clearTextEvent: EventEmitter < any >
        constructor(private globalValue: GlobalValue, private io: Io) {
            this.clearTextEvent = new EventEmitter();
        }

    openRoom(obj: any) {
        this.clearTextEvent.emit()
        this.globalValue.currentRoom = obj


        _.forEach(this.globalValue.tabRooms, (val, idx) => {
            val.viewIndex = 99 - idx;
        })

        this.globalValue.currentRoom.viewIndex = 100

        if (this.globalValue.tabRooms.indexOf(obj) == -1) {
            this.globalValue.tabRooms.unshift(obj)
        }


        if (this.globalValue.tabRooms.length > 8) {
            this.globalValue.tabRooms.splice(this.globalValue.tabRooms.length-1,1)
        }


        if (!obj.hasLoad) {
            obj.hasLoad = true
            this.io.socket.emit('messagereq', JSON.stringify({ roomid: obj.roomId }))
        }
    }

    closeRoom(obj: any) {
        let roomIdx = this.globalValue.tabRooms.indexOf(obj)
        this.globalValue.tabRooms.splice(roomIdx, 1)
        if (this.globalValue.tabRooms.length > 0) {
            this.openRoom(this.globalValue.tabRooms[0])
        }

    }

}
