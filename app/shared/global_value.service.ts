import { Injectable } from '@angular/core';
@Injectable()
export class GlobalValue {
    public loginInfo: loginInfo;
    public userInfo: any;
    public users: Array < any > ;
    public organizeres: Array < any > ;
    public rooms: Array < any > ;
    public currentRoom:any;
   
}

export const RoomTemplate:room = {
    roomId: null,
        msg: [],
        users: [],
        name: null,
        picLink: null,
        hasLoad: false,
        unreadCount: 0,
        active: false
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
        active: Boolean
}
