import { Component, Input } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { GlobalValue } from "../../shared/global_value.service";

@Component({
    moduleId: module.id,
    templateUrl: 'organizeres.component.html',
    selector: 'organizeres'
})

export class Organizeres {   
    public organizeres: Array < any >

    my(_val: any) {
        if (_val.length > 0) {
            return "has_child"
        } else {
            return "end"
        }
    }

    constructor(globalValue: GlobalValue) {
        this.organizeres = globalValue.organizeres
    }



}
