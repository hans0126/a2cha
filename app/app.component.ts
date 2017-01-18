import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalValue, loginInfo } from "./shared/global_value.service";


@Component({
    moduleId: module.id,
    selector: 'my-app',
    styleUrls: ['besttour_Talk.css'],
    template: `<div *ngIf="0">123</div>`,
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {
    private subscription: Subscription;
    constructor(private globalValue: GlobalValue) {

        globalValue.loginInfo = {
            employeeId: this.getParameterByName('employee_id') || "08073",
            passwd: this.getParameterByName('passwd') || "912316",
            accountsType: this.getParameterByName('accounts_type') || "5",
            ittmscode: this.getParameterByName('ittmscode') || "C000061"
        }

        console.log(globalValue.loginInfo)

    }

    private getParameterByName(name, url) {
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
