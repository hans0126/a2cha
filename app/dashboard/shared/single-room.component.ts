import { Component, Input } from '@angular/core';
@Component({
    selector: 'room',
    template: `<div class='person' (click)="openRoom()">
    			<div class='person_img'   [ngStyle]="{'background-image': 'url(' + user.pic_link + ')'}"></div>
    			<div class='person_name'>{{user.name}}</div>
    			<div class='person_num' *ngIf='user.unreadCount>0'></div>
    		  	<div id='CB'></div>
    		  	</div>`
})

export class SingleRoom {
    @Input() user:any;

    constructor(){

    }

    ngOnInit() {
      

      
    }

    openRoom(){
    	
    }
}
