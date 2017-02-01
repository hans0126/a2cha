import { Subscription, Observable} from 'rxjs/Rx';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalValue, loginInfo } from "./shared/global_value.service";


@Component({
    moduleId: module.id,
    selector: 'my-app',
    // styleUrls: ['besttour_Talk.css'],
    template: `<login-page *ngIf="GB.pageIndex == 0"></login-page>
                <dashboard-page *ngIf="GB.pageIndex == 1"></dashboard-page>`
        // encapsulation: ViewEncapsulation.None
})

export class AppComponent {

    constructor(private GB: GlobalValue) {


        

        GB.loginInfo = {
            employeeId: this.getParameterByName('employee_id') || "08073",
            passwd: this.getParameterByName('passwd') || "904308",
            accountsType: this.getParameterByName('accounts_type') || "5",
            ittmscode: this.getParameterByName('ittmscode') || "C000061"
        }

        console.log(GB.loginInfo)
    }

    private getParameterByName(name: any, url ? : any) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


}
