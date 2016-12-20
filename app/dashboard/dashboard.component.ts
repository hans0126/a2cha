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
        }

        this.gb = globalValue

        io.socket.on('messageres', (msg: any) => {
            io.getMsg(msg).subscribe((msg: any) => { console.log(msg) },
                (msg: any) => { console.log(msg) },
                () => { console.log('load msg success') })
        })






    }


}
