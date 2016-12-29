import { Component, ViewChild, ElementRef } from '@angular/core';
import { GlobalValue } from "../shared/global_value.service";
import { Io } from "../shared/socket.service";
import { Router } from '@angular/router';
import * as _ from "lodash";


import { Chat } from "./shared/chat.service";


@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class Dashboard {
    public gb: any = {}
    public currentShowList: any
    @ViewChild('searchInput') searchInput: ElementRef

    constructor(private globalValue: GlobalValue,
        private router: Router,
        private io: Io) {

        if (!globalValue.userInfo) {
            this.router.navigate(['']);
            return
        }

        this.gb = globalValue
        this.currentShowList = this.gb.userInfo.btns[0].name

        io.socket.on('messageres', (re: any) => {
            io.roomInit(re).subscribe(
                (msg: any) => { console.log(msg) },
                (msg: any) => { console.log(msg) },
                () => { console.log('load msg success') })
        })

        io.socket.on('receive', (msg: any) => {
            let re = JSON.parse(msg)
            let room = this.globalValue.rooms[re.roomid]
            room.msg.push(re)
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

        this.globalValue.searchRooms = [];
        let reg = new RegExp('.?' + text + '.?', 'i')

        _.forOwn(this.globalValue.rooms, (o, idx) => {
            if (o.name.match(reg)) {
                this.globalValue.searchRooms.push(o)
            }
        })

        this.searchInput.nativeElement.value = ""
        this.changeRoomList("searchRooms")
    }

    changeRoomList(name: String) {
        this.currentShowList = name
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

export class RoomTab {
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
        if (room.viewIndex == 100) {
            return "active"
        }
    }

    closeRoom(event: any, item: any) {
        event.preventDefault();
        event.stopPropagation();
        this.chat.closeRoom(item);


    }
}

/*
 
            */
