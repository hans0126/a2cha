import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { GlobalValue } from "../../shared/global_value.service";

@Component({
    moduleId: module.id,
    templateUrl: 'grouptree.component.html',
    selector: 'grouptree'
})

export class Grouptree {
    public groupTree: Array < any >

        checkChild(_val: any) {
            if (_val.length > 0) {
                return "has_child"
            } else {
                return "end"
            }
        }

    constructor(globalValue: GlobalValue) {
        this.groupTree = globalValue.groupTree
        console.log(this.groupTree);
    }

    accordion(obj: any) {
        obj.isOpen = !obj.isOpen
    }


}
//
