import { Injectable, EventEmitter } from '@angular/core';
import * as _ from "lodash";
import { GlobalValue } from '../../shared/global_value.service';
import { Io } from "../../shared/socket.service";




@Injectable()

export class Chat {
    public clearTextEvent: EventEmitter < any > ;

    constructor(private GB: GlobalValue, private io: Io) {
        this.clearTextEvent = new EventEmitter();
    }

    openRoom(obj: any) {
        this.clearTextEvent.emit()
        this.GB.currentRoom = obj

        this.GB.roomImageLoadedProcess = 0
        this.GB.roomImageProcess = 0

        _.forEach(this.GB.tabRooms, (val, idx) => {
            val.viewIndex = 99 - idx;
        })

        this.GB.currentRoom.viewIndex = 100

        if (this.GB.tabRooms.indexOf(obj) == -1) {
            this.GB.tabRooms.unshift(obj)
        }


        if (this.GB.tabRooms.length > 8) {
            this.GB.tabRooms.splice(this.GB.tabRooms.length - 1, 1)
        }

        this.io.socket.emit('openreq', JSON.stringify({ roomid: obj.roomId }));
        obj.unreadCount = 0;

        if (!obj.hasLoad) {
            obj.hasLoad = true
            this.io.socket.emit('messagereq', JSON.stringify({ roomid: obj.roomId }))
        }

        if (this.GB.currentRoom.parent) {
            let parent = this.GB.currentRoom.parent

            let hasUnread = false
            _.forEach(parent.room, (val, idx) => {
                if (this.GB.rooms[val.roomid].unreadCount > 0) {
                    hasUnread = true
                }
            })

            parent.notify = hasUnread
        }

    }

    closeRoom(obj: any) {
        let roomIdx = this.GB.tabRooms.indexOf(obj)
        this.GB.tabRooms.splice(roomIdx, 1)
        this.GB.currentRoom = null
        if (this.GB.tabRooms.length > 0) {
            this.openRoom(this.GB.tabRooms[0])
        }

    }

}
