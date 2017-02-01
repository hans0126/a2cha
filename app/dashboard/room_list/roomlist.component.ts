import { Component, Input } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { GlobalValue } from "../../shared/global_value.service";

@Component({
    moduleId: module.id,
    templateUrl: 'roomlist.component.html',
    selector: 'roomList'
})

export class RoomListComponent {
    public gd: any
    @Input() listType: String



    constructor(private globalValue: GlobalValue) {
        this.gd = globalValue
    }


    ngOnInit() {
       
    }

}
//
