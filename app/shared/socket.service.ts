import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import * as _ from "lodash";
import { loginInfo, GlobalValue, RoomTemplate } from './global_value.service';

declare var SocketIOFileClient: any;

@Injectable()
export class Io {
    socket: SocketIOClient.Socket;
    public socketIOFile: any

    constructor(private globalValue: GlobalValue) {}


    login(loginInfo: loginInfo) {

        let query: String = `employee_id=${loginInfo.employeeId}&passwd=${loginInfo.passwd}`
        query += loginInfo.accountsType ? `&accounts_type=${loginInfo.accountsType}` : ''
        query += loginInfo.ittmscode ? `&ittmscode=${loginInfo.ittmscode}` : ''

        let observable = Observable.create((observer: any) => {

            this.socket = io('ws://evpn.ittms.com.tw:5280', {
                query: query,
                transports: ['websocket']
            });

            this.socketIOFile = new SocketIOFileClient(this.socket)

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
                this.globalValue.userInfo.authType = loginInfo.accountsType
                this.userAuth()
                observer.next('get current user data');
                this.socket.emit('usersreq');
            })

            this.socket.on('usersres', (msg: any) => {
                observer.next('get users room data');
                let users = JSON.parse(msg)['data']
                this.createRoomFromUser(users, () => {
                    this.socket.emit('organizereq');
                })
            })

            this.socket.on('organizeres', (msg: any) => {
                observer.next('get organizeres');
                this.globalValue.organizeres = JSON.parse(msg)['data'];
                this.socket.emit('projectreq')

            })

            this.socket.on('projectres', (msg: any) => {
                let rooms = JSON.parse(msg)['data'];
                this.createGroupRooms(rooms, () => {
                    // console.log( this.globalValue.projectRooms);
                    observer.next('get projectres room');
                    this.socket.emit('openhistoryreq');
                })
            })

            this.socket.on('openhistoryres', (msg: any) => {
                let rooms = JSON.parse(msg)['data'];            
                this.createHistoryRooms(rooms, () => {
                    observer.next('get history room');
                    observer.complete();
                })
            })



        })

        return observable
    }

    upload(file: any, options: Object) {
        this.socketIOFile.upload(file, options);
    }

    roomInit(msg: any) {
        let observable = Observable.create((observer: any) => {

            let re = JSON.parse(msg);
            if (re.status == 0) {
                observer.next('get msg success')
                let data = re.data
                let room = this.globalValue.rooms[data.room.roomid]

                room.msg = data.message
                _.forEach(data.member, (val, idx) => {
                    room.users.push(val.employeeid)
                })


                observer.complete()

            } else {
                observer.error('get room init error')
            }

        })

        return observable
    }



    private createRoomFromUser(users: Array < any > , fn: () => void) {
        this.globalValue.rooms = [];
        this.globalValue.users = [];
        let createRoom = false
        let arrUnit = ['organizeres','project','history']

        _.forEach(this.globalValue.userInfo.btns,(val,idx)=>{
           if(arrUnit.indexOf(val.name)>-1){
               createRoom = true
               return false
           }       
        })
      
        _.forEach(users, (val, idx) => {
            //create user
            this.globalValue.users[val.employee_id] = val;
            //create room
            if(createRoom){
                let copyRoom = Object.assign({}, RoomTemplate)
                copyRoom.roomId = val.roomid;
                copyRoom.name = val.name;
                copyRoom.picLink = val.pic_link;
                this.globalValue.rooms[val.roomid] = copyRoom
            }

        })

        fn();

    }

    private createHistoryRooms(projects: Array < any > , fn: () => void) {

        this.globalValue.historyRooms = [];

        _.forEach(projects, (val, idx) => {
            let room = this.globalValue.rooms[val.roomid]
            this.globalValue.historyRooms.push(room)
        })

        fn();

    }

    private createGroupRooms(rooms: Array < any > , fn: () => void) {
        this.globalValue.projectRooms = [];
        this.globalValue.providerRooms = [];

        _.forEach(rooms, (val, idx) => {
            //create room
            let copyRoom = Object.assign({}, RoomTemplate)
            copyRoom.roomId = val.roomid;
            copyRoom.name = val.roomname;
            copyRoom.picLink = val.pic_link;
            this.globalValue.rooms[val.roomid] = copyRoom

            switch (val.chatroomtype) {
                case "5":
                    this.globalValue.projectRooms.push(copyRoom)
                    break;

                case "A":
                    this.globalValue.providerRooms.push(copyRoom)
                    break;

            }
        })

        fn();

    }


    private organizeresAddAttr() {
        _.forEach(this.globalValue.organizeres, (val, idx) => {
            val.isOpen = false
        })
    }

    private userAuth() {
        this.globalValue.userInfo.btns = []
        switch (this.globalValue.userInfo.authType) {
            case "5":
                this.addAuth("organizeres")
                this.addAuth("provider")
                this.addAuth("project")
                this.addAuth("history")
                break;

            case "A":
                this.addAuth("provider")
                break
        }
    }

    private addAuth(item: any) {
        let btnItem = this.globalValue.authType[item];
        this.globalValue.userInfo.btns.push(btnItem)
    }

}


//employee_id: String, passwd: String, accounts_type ? : String, ittmscode ? : String
