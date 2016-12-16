import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import * as _ from "lodash";

import { loginInfo } from './global_value.service';
import { GlobalValue, RoomTemplate } from './global_value.service';
@Injectable()
export class Io {
    socket: SocketIOClient.Socket;

    constructor(private globalValue: GlobalValue) {}


    login(loginInfo: loginInfo) {

        let query: String = `employee_id=${loginInfo.employeeId}&passwd=${loginInfo.passwd}`
        query += loginInfo.accountsType ? `&accounts_type=${loginInfo.accountsType}` : ''
        query += loginInfo.ittmscode ? `&ittmscode=${loginInfo.ittmscode}` : ''

        let observable = Observable.create((observer: any) => {

            this.socket = io('ws://evpn.ittms.com.tw:5280', { query: query });

            this.socket.on("connect", () => {
                observer.next('connect');
            })

            this.socket.on('login', () => {
                observer.next('login');
                
            })

            this.socket.on('logout', () => {
                observer.error('login fail!!');
            })

            this.socket.on('personres', (msg: any) => {
                this.globalValue.userInfo = JSON.parse(msg)['data'];
                observer.next('get current user data');
                this.socket.emit('usersreq');
            })

            this.socket.on('usersres', (msg: any) => {
                observer.next('get users room data');
                let users = JSON.parse(msg)['data']

                this.createUsersRoom(users, () => {
                    this.socket.emit('organizereq');
                })
            })

            this.socket.on('organizeres', (msg: any) => {
                observer.next('get organizeres');
                this.globalValue.organizeres = JSON.parse(msg)['data'];
                observer.complete();
            })

            this.socket.on('projectres', () => {
                observer.next('get projectres room');
            })

        })

        return observable
    }

    private createUsersRoom(users: Array < any > , fn: () => void) {
        this.globalValue.rooms = [];
        this.globalValue.users = [];

        _.forEach(users, (val, idx) => {
            //create user
            this.globalValue.users[val.employee_id] = val;
            //create room
            let copyRoom = Object.assign({}, RoomTemplate)
            copyRoom.roomId = val.roomid;
            copyRoom.name = val.name;
            copyRoom.picLink = val.pic_link;
            this.globalValue.rooms[val.roomid] = (copyRoom)
        })

        fn();

    }
}


//employee_id: String, passwd: String, accounts_type ? : String, ittmscode ? : String
