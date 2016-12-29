import { Injectable } from '@angular/core';
@Injectable()
export class GlobalValue {
    public loginInfo: loginInfo;
    public userInfo: any;
    public users: Array < any > ;
    public organizeres: Array < any > ;
    public rooms: Array < any > ;
    public searchRooms: Array < any > = [];
    public projectRooms: Array < any > = [];
    public historyRooms: Array < any > = [];
    public providerRooms: Array < any > = [];
    public currentRoom: any;
    public authType: Array < any > = [];
    public tabRooms: Array < any >= [];

    constructor() {
        this.authType["organizeres"] = {
            class: "Menu_hsihung",
            name: "organizeres"
        }

        this.authType["provider"] = {
            class: "Menu_guide",
            name: "provider"
        }

        this.authType["project"] = {
            class: "Menu_group",
            name: "project"

        }

        this.authType["history"] = {
            class: "Menu_chat",
            name: "history"
        }

    }

}

export const RoomTemplate: room = {
    roomId: null,
    msg: [],
    users: [],
    name: null,
    picLink: null,
    hasLoad: false,
    unreadCount: 0,
    active: false,
    viewIndex:1
}


export interface loginInfo {
    employeeId: String,
        passwd: String,
        accountsType ? : String,
        ittmscode ? : String
}

export interface room {
    roomId ? : String,
        msg: Array < any > ,
        users: Array < any > ,
        name: String,
        picLink: String,
        hasLoad: Boolean,
        unreadCount: Number,
        active: Boolean,
        viewIndex:Number
}
