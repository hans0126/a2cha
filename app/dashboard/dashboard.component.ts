import { Component, ViewChild, ElementRef } from '@angular/core';
import { GlobalValue } from "../shared/global_value.service";
import { Io } from "../shared/socket.service";
import * as _ from "lodash";


import { Chat } from "./shared/chat.service";


@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    selector: 'dashboard-page'
})

export class DashboardComponent {
    public currentShowList: any


    @ViewChild('searchInput') searchInput: ElementRef

    constructor(private GB: GlobalValue,
        private io: Io) {

        if (!GB.userInfo) {
            GB.pageIndex = 0;
            return
        }


        this.currentShowList = GB.userInfo.btns[0].name

        io.socket.on('messageres', (re: any) => {
            io.roomInit(re).subscribe(
                (msg: any) => { console.log(msg) },
                (msg: any) => { console.log(msg) },
                () => { console.log('load msg success') })
        })

        io.socket.on('receive', (msg: any) => {
            let re = JSON.parse(msg)

            let room = GB.rooms[re.roomid]

            room.msg.push(re)

            if (GB.currentRoom) {
                if (GB.currentRoom.roomId != re.roomid) {
                    room.unreadCount++;
                }
            } else {
                room.unreadCount++;
            }
            /*
            if (GB.tabRooms.indexOf(room) == -1) {
                GB.tabRooms.push(room)
            }
            */

            if (room.parent) {
                if (room.unreadCount > 0) {
                    room.parent.notify = true
                } else {
                    room.parent.notify = false
                }
            }


        })
    }

    onKey(event: any) {
        if (event.which == 13) {
            this.searchRoom()
        }
    }

    searchRoom() {

        let text = this.searchInput.nativeElement.value.replace(/^\s+|\s+$/g, '')
        if (!text) {
            return
        }

        this.GB.searchRooms = [];
        let reg = new RegExp('.?' + text + '.?', 'i')

        _.forOwn(this.GB.rooms, (o, idx) => {
            if (o.name.match(reg)) {
                this.GB.searchRooms.push(o)
            }
        })



        this.searchInput.nativeElement.value = ""
        this.changeRoomList("searchRooms")
    }

    changeRoomList(name: string) {
        this.currentShowList = name
    }


    menuBtnClass(obj: any) {
        let elmClass = {};
        elmClass[obj.class] = true;
        elmClass['mainBtnNotify'] = false

        if (obj.notifyTarget) {
            _.forEach(this.GB[obj.notifyTarget], (val, idx) => {               
                if (val.unreadCount > 0) {
                    elmClass['mainBtnNotify'] = true;
                    return false
                }
            })
        }

        return elmClass
    }


}

@Component({
    moduleId: module.id,
    template: `<div *ngFor="let item of gb.tabRooms" [ngStyle]="tabStyle(item)" [ngClass]="tabClass(item)" (click)="openRoom(item)">
                    <div class="roomTitle">{{item.name}}</div>
                    <div class="closeRoomBtn" (click)="closeRoom($event,item)">
                        <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </div>
               </div>`,
    selector: "room-tab"
})

export class RoomTabComponent {
    public gb: any;
    constructor(private globalValue: GlobalValue, private chat: Chat) {
        this.gb = globalValue
    }

    openRoom(room: any) {
        this.chat.openRoom(room);
    }

    tabStyle(room: any) {
        return {
            "z-index": room.viewIndex
        }
    }

    tabClass(room: any) {
        let thisClass: Array < any > = []

        if (room.viewIndex == 100) {
            thisClass.push("active")
        }

        if (room.unreadCount > 0) {
            thisClass.push("notify")
        }

        return thisClass
    }

    closeRoom(event: any, item: any) {
        event.preventDefault();
        event.stopPropagation();
        this.chat.closeRoom(item);
    }
}


/*
 
            */
