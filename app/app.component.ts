import { Subscription, Observable } from 'rxjs';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalValue, loginInfo } from "./shared/global_value.service";


@Component({
    moduleId: module.id,
    selector: 'my-app',
    styleUrls: ['besttour_Talk.css'],
    template: `<router-outlet></router-outlet>`,
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {
    private subscription: Subscription;
    constructor(private route: ActivatedRoute, private globalValue: GlobalValue) {

       

        this.route.queryParams.subscribe((params: any) => {

            globalValue.loginInfo = {
                employeeId: params['employee_id'] || "08073",
                passwd: params['passwd'] || "646805",
                accountsType: params['accounts_type'] || "5",
                ittmscode: params['ittmscode'] || "C000061"
            }
            
        });

     


    }


}
