import { Component } from '@angular/core';
import { GlobalValue } from "../shared/global_value.service";
import { Io } from "../shared/socket.service";
import { Router } from '@angular/router';
import * as _ from "lodash";


@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class Dashboard {
    public gb: Object = {}

    constructor(private globalValue: GlobalValue, private router: Router, private io: Io) {

        if (!globalValue.userInfo) {
            this.router.navigate(['']);
            return
        }

        this.gb = globalValue

        io.socket.on('messageres', (re: any) => {
            io.roomInit(re).subscribe(
                (msg: any) => { console.log(msg) },
                (msg: any) => { console.log(msg) },
                () => { console.log('load msg success') })
        })

        io.socket.on('receive', (msg: any) => {
            let re = JSON.parse(msg)
            console.log(re)
            let room = this.globalValue.rooms[re.roomid]
            room.msg.push(re)
        })
        /*
        io.socket.on('filesendres', function(msg: any) {
            console.log(msg)
        });
        */





    }


}
