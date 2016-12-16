import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalValue, loginInfo } from "../shared/global_value.service";
import { Io } from "../shared/socket.service";

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class Login {
    public loginInfo: loginInfo
    public socket: Object
    connection: any

    constructor(private globalValue: GlobalValue, private io: Io, private router: Router ) {
        this.loginInfo = globalValue.loginInfo
    }

    submit() {
        this.io.login(this.loginInfo).subscribe(
        	(msg: String) => console.log(msg),
            (msg: String) => { console.log(msg) },
            () => {
                console.log('complete')
                this.router.navigate(['main']);
            })

    }
}
