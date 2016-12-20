import { Component, Input } from '@angular/core';
import { Chat } from '../shared/chat.service';
import { GlobalValue } from '../../shared/global_value.service';

@Component({
    moduleId: module.id,
    selector: "chat-panel",
    templateUrl: "chat-panel.component.html"
})

export class ChatPanel {
    public gb: Object
    constructor(globalValue: GlobalValue) {
        this.gb = globalValue
    }

}

@Component({
    moduleId: module.id,
    selector: "msg",
    template: `<div *ngIf="!owner" class='Message_img' [ngStyle]="{'background-image': 'url('+pic+')'}"></div>
	<div [ngClass]= "{'Message_To_icon':owner,'Message_From_icon':!owner}"></div>
	<div [ngClass]="classSwitch()" [innerHtml]="msgContent"></div>
	<div [ngClass]="{'Message_To_time':owner,'Message_From_time':!owner}">{{dateTime}}</div>
    <div id='CB'></div>`
})

export class SingleMsg {
    @Input() singleMsg: any

    public owner: Boolean = true
    public pic: String
    public dateTime:String
    public msgContent:String
    constructor(private globalValue: GlobalValue) {}

    ngOnInit() {
    	console.log("A")
        let direct = 'To',
        msgType = 'txt'

        if (this.globalValue.userInfo.employeeid != this.singleMsg.employeeid) {
            this.owner = false
            this.pic = this.globalValue.users[this.singleMsg.employeeid].pic_link
            direct = 'From'
        }

        this.dateTime = this.getDate(this.singleMsg.date)

          switch (this.singleMsg.messagetype) {
            case "1": //文字
                this.msgContent = this.singleMsg.message;
                break;
            case "2": //檔案
                this.msgContent = "<a href='" + this.singleMsg.filepath + "' target='_blank'>" + this.singleMsg.filename + "</a>";
                break;
            case "3":
            case "4":
                msgType = "sticker";
                this.msgContent = "<a href='" + this.singleMsg.filepath + "' target='_blank'><img src='" + this.singleMsg.filepath + "'/></a>";
                break;

        }



        /*
        if (this.singleMsg.messagetype == "1" || this.singleMsg.messagetype == "2") {
            this.msgContent += "<div class='Message_" + direct + "_icon'></div>";
        }
		*/

        /*

        let direct = 'To',
            msgType = 'txt';



        switch (this.singleMsg.messagetype) {
            case "1": //文字
                this.msgContent = this.singleMsg.message;
                break;
            case "2": //檔案
                this.msgContent = "<a href='" + this.singleMsg.filepath + "' target='_blank'>" + this.singleMsg.filename + "</a>";
                break;
            case "3":
            case "4":
                msgType = "sticker";
                this.msgContent = "<a href='" + this.singleMsg.filepath + "' target='_blank'><img src='" + this.singleMsg.filepath + "'/></a>";
                break;

        }

       

        if (this.globalValue.userInfo.employeeid != this.singleMsg.employeeid) {
            let sendUser = this.globalValue.users[this.singleMsg.employeeid];
            direct = 'From';
            this.msgContent += `"<div class='Message_img' [ngStyle]="{'background-image': 'url('${sendUser.pic_link}')'}"></div>"`
        }

        if (this.singleMsg.messagetype == "1" || this.singleMsg.messagetype == "2") {
            this.msgContent += "<div class='Message_" + direct + "_icon'></div>";
        }

        this.msgContent += "<div class='Message_" + direct + "_" + msgType + "'>" + msgContent + "</div>";
        this.msgContent += "<div class='Message_" + direct + "_time'>{{date}}</div>";
        this.msgContent += "<div id='CB'></div>";
		*/


    }

    classSwitch(){
    	console.log("B")
    	
    	return "AAAA"
    }

    getDate(_d:String) {
        var _re = _d.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
        return _re[4] + ":" + _re[5]
    }

}
