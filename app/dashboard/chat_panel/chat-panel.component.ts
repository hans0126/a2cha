import { Component, Input, ViewChild, ElementRef, AfterViewInit, Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { Chat } from '../shared/chat.service';
import { GlobalValue } from '../../shared/global_value.service';
import { ChatDate } from '../../shared/pips.service';
import { Io } from "../../shared/socket.service";


@Component({
    moduleId: module.id,
    selector: "chat-panel",
    templateUrl: "chat-panel.component.html"
})

export class ChatPanel {
    public gb: Object
    @ViewChild('msgContentElem') msgContentElem: ElementRef
    @ViewChild('fileElem') fileElem: ElementRef
    
    constructor(globalValue: GlobalValue) {
        this.gb = globalValue
    }

 
}

@Component({
    moduleId: module.id,
    selector: "msg",
    template: `<div *ngIf="!owner">{{singleMsg.employeename}}</div>
    <div *ngIf="!owner" class='Message_img' [ngStyle]="{'background-image': 'url('+userPic+')'}"></div>
	<div *ngIf="msgType=='txt'" [ngClass]= "{'Message_To_icon':owner,'Message_From_icon':!owner}"></div>
	<div [ngClass]="msgTypeClass()" [ngSwitch]="msgDisplayType">
		<div *ngSwitchCase="'normal'">{{singleMsg.message}}</div>
		<div *ngSwitchCase="'file'"><a href='{{singleMsg.filepath}}' target='_blank'>{{singleMsg.filename}}</a></div>
		<div *ngSwitchCase="'image'"><a href='{{singleMsg.filepath}}' target='_blank'><img #img src='{{singleMsg.filepath}}'/></a></div>
	</div>
	<div [ngClass]="{'Message_To_time':owner,'Message_From_time':!owner}">{{singleMsg.date| ChatDate}}</div>
    <div id='CB'></div>`
})

export class SingleMsg {
    @Input() singleMsg: any
    @Input() msgContentElem: any

    @ViewChild('img') img: ElementRef
    public owner: Boolean = true
    public userPic: String
    public dateTime: String
    public msgContent: String
    public direct: String = "To"
    public msgType: String = "txt"
    public msgDisplayType: String //normal,file,image
    constructor(private globalValue: GlobalValue) {}

    ngOnInit() {
        console.log(this.singleMsg)
        if (this.globalValue.userInfo.employeeid != this.singleMsg.employeeid) {
            this.owner = false
            this.userPic = this.globalValue.users[this.singleMsg.employeeid].pic_link
            this.direct = 'From'
        }

        switch (this.singleMsg.messagetype) {
            case "1": //文字             
                this.msgDisplayType = "normal"
                break;
            case "2": //檔案                
                this.msgDisplayType = "file"
                break;
            case "3":
            case "4":
                this.msgType = "sticker";
                this.msgDisplayType = "image"
                break;
        }

    }

    ngAfterViewInit() {
        if (this.img) {
            this.img.nativeElement.onload = () => {
                this.scrollToBottom()
            }
        } else {
            this.scrollToBottom()
        }
    }

    msgTypeClass() {
        return `Message_${this.direct}_${this.msgType}`
    }

    scrollToBottom() {
        this.msgContentElem.scrollTop = this.msgContentElem.scrollHeight
    }

    getCaretPosition() {
        return window.getSelection().getRangeAt(0).endOffset;
    }


}


@Directive({
    selector: '[inputBox]'
})
export class InputBox {
    public msgContent: String
    public socket: any
    public roomId: String

    constructor(private elRef: ElementRef,
        private globalValue: GlobalValue,
        private io: Io,
        private chat: Chat) {

        this.socket = io.socket
        this.roomId = globalValue.currentRoom.roomId
        chat.clearTextEvent.subscribe(() => {
        	 this.clearContent()
        })
    }

    @HostListener('keypress', ['$event']) onKeyDown(event: any) {
        this.msgContent = this.elRef.nativeElement.innerText
        if (event.which === 13) {
            event.preventDefault();
            event.stopPropagation();

            if (!this.msgContent) return

            let obj = {
                roomid: this.roomId,
                message: this.msgContent
            }

            this.socket.emit('textsendreq', JSON.stringify(obj));
            this.clearContent()
        }
    }

    @HostListener('paste', ['$event']) onPast(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.msgContent = event.clipboardData.getData('text/plain')
        this.elRef.nativeElement.innerText = this.msgContent
    }

    private clearContent() {
        this.msgContent = ""
        this.elRef.nativeElement.innerText = ""
    }
}


@Directive({
    selector: '[updateFile]'
})
export class updateFile {
    @Input() fileElem: any

    public roomId: any
    constructor(private io: Io,
        private globalValue: GlobalValue) {

        this.roomId = globalValue.currentRoom.roomId
    }

    ngOnInit() {
        this.fileElem.onchange = () => {
            console.log(this.roomId);
            this.io.upload(this.fileElem.files[0], { to: 'file', data: { 'roomid': this.roomId, 'id': '414324' } });
            this.fileElem.value = "";
        }

    }


    @HostListener('click', ['$event']) onClick(event: any) {
        this.fileElem.click()
    }
}
