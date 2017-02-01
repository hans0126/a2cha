import { Component, Input, ViewChild, ElementRef, AfterViewInit, Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { Chat } from '../shared/chat.service';
import { GlobalValue } from '../../shared/global_value.service';
import { ChatDate } from '../../shared/pips.service';
import { Io } from "../../shared/socket.service";
import { Observable } from 'rxjs/Rx';




@Component({
    moduleId: module.id,
    selector: "chat-panel",
    templateUrl: "chat-panel.component.html"
})

export class ChatPanelComponent {   
  
    @ViewChild('msgContentElem') msgContentElem: ElementRef
    @ViewChild('fileElem') fileElem: ElementRef

    constructor(private GB: GlobalValue) {
        
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
        <div *ngSwitchCase="'file'"><a [href]="singleMsg.filepath" target='_blank'>{{singleMsg.filename}}</a></div>
        <div *ngSwitchCase="'image'"><a [href]="singleMsg.filepath" target='_blank'><img #img [src]="singleMsg.filepath" (load)="loadedImg()" (error)="imgError($event)"/></a></div>
    </div>
    <div [ngClass]="{'Message_To_time':owner,'Message_From_time':!owner}">{{singleMsg.date| ChatDate}}</div>
    <div id='CB'></div>`
})

export class SingleMsgComponent {
    @Input() singleMsg: any
    @Input() msgContentElem: any

    @Input() ready: boolean
    @Input() arrImg: any



    @ViewChild('img') img: ElementRef
    public owner: Boolean = true
    public userPic: String
    public dateTime: String
    public msgContent: String
    public direct: String = "To"
    public msgType: String = "txt"
    public msgDisplayType: String //normal,file,image
    constructor(private GB: GlobalValue) {}

    loadedImg(){
      this.imgHandler() 
    }

    imgError(e:Event){
       this.imgHandler()
    }

    private imgHandler(){
        this.GB.roomImageLoadedProcess++
      //  console.log(`${this.GB.roomImageLoadedProcess}/${this.GB.roomImageProcess}`);

        if(this.GB.roomImageLoadedProcess == this.GB.roomImageProcess){
            this.scrollToBottom()
        }
    }


    ngOnInit() {
        if (this.GB.userInfo.employeeid != this.singleMsg.employeeid) {
            this.owner = false
            this.userPic = this.GB.users[this.singleMsg.employeeid].pic_link
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
                this.GB.roomImageProcess++
                break;
        }     

    }

    ngAfterViewInit() {
        if (this.ready) {
            this.scrollToBottom();
             
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
export class InputBoxDirective {
    public msgContent: String
    public socket: any
    public roomId: String

    constructor(private elRef: ElementRef,
        private globalValue: GlobalValue,
        private io: Io,
        private chat: Chat) {

        this.socket = io.socket
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
                roomid: this.globalValue.currentRoom.roomId,
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
export class updateFileDirective {
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


@Component({
    moduleId: module.id,
    template: ` <div>
                <div class="person_img_l"  [ngStyle]="{'background-image': 'url(' + gb.currentRoom.picLink + ')'}"></div>
                <div class="person_name_l">{{gb.currentRoom.name}}</div>
                <div class="GL_more" *ngIf="gb.currentRoom.users.length > 2" (click)="listToggle()">more</div>
                </div>
                <div class="GL_item" [hidden]="!roomUserList" *ngIf="gb.currentRoom.users.length > 2">   
                    <user-img 
                        class="GL_img" 
                        *ngFor="let item of gb.currentRoom.users" 
                        (click)="openRoom(item)"
                        [ngStyle]="{'background-image': 'url(' + item.pic_link + ')'}" 
                        [userDetail]="item" 
                        [class.active]="item.floatLabelShow"></user-img>
                </div>
                `,
    selector: "room-detail"
})

export class RoomDetailComponent {
    public gb: any;
    public roomUserList: boolean = false;
    constructor(private globalValue: GlobalValue, private chat: Chat) {
        this.gb = globalValue
    }

    listToggle() {
        this.roomUserList = !this.roomUserList;
    }

    openRoom(user: any) {
        //        console.log(user.employee_id);


        let room = this.globalValue.rooms[this.globalValue.users[user.employee_id].roomid]
        this.chat.openRoom(room);
    }
}


@Component({
    moduleId: module.id,
    template: `<div class="floatLabel">{{userDetail.name}}</div>`,
    selector: "user-img"
})

export class UserImgComponent {

    @Input() userDetail: any

    constructor(private elementRef: ElementRef) {

    }

    ngOnInit() {
        this.userDetail.floatLabelShow = false;
    }

    @HostListener('mouseover', ['$event']) onMouseover(event: any) {
        this.userDetail.floatLabelShow = true;
    }

    @HostListener('mouseout', ['$event']) onMouseout(event: any) {
        this.userDetail.floatLabelShow = false;
    }

}
