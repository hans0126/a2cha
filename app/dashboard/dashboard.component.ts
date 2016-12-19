import { Component } from '@angular/core';
import { GlobalValue } from "../shared/global_value.service";
import { Io } from "../shared/socket.service";
import { Router } from '@angular/router';


@Component({
    moduleId: module.id, 
    templateUrl: 'dashboard.component.html'
})

export class Dashboard {
	

    constructor(private globalValue: GlobalValue,private router: Router ) {
        
        if (!globalValue.userInfo) {
        	
        	this.router.navigate(['']);
        }
        
        //console.log(globalValue);
        
    }
}
