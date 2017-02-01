import { Component } from '@angular/core';

import { GlobalValue, loginInfo } from "../shared/global_value.service";
import { Io } from "../shared/socket.service";

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    selector: 'login-page'
})

export class Login {
    public socket: Object
    connection: any

    constructor(private GB: GlobalValue, private io: Io) {

    }

    submit() {

        this.io.login(this.GB.loginInfo).subscribe(
            (msg: String) => console.log(msg),
            (msg: String) => { console.log(msg) },
            () => {
                console.log('complete')
                this.GB.pageIndex = 1
            })

    }
}
