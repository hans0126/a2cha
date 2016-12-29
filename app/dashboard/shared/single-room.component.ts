import { Component, Input } from '@angular/core';
import { Chat } from './chat.service.js';
import { GlobalValue } from "../../shared/global_value.service";
@Component({
    selector: 'room',
    template: `<div (click)="openRoom()">
    			<div class='person_img'   [ngStyle]="{'background-image': 'url(' + room.picLink + ')'}"></div>
    			<div class='person_name'>{{room.name}}</div>
    			<div class='person_num' *ngIf='room.unreadCount > 0'></div>
    		  	
    		  	</div>`
})

export class SingleRoom {
    @Input() roomId:any
    public room:any
   
    constructor(private chat:Chat,private globalValue:GlobalValue){}

    ngOnInit() {
        this.room = this.globalValue.rooms[this.roomId]
    }

    openRoom(){
    	this.chat.openRoom(this.room)
    }

   
}
