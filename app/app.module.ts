import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
//componet
import { AppComponent } from './app.component';
import { Login } from './login/login.component.js';
import { DashboardComponent, RoomTabComponent } from './dashboard/dashboard.component.js';

//service
import { Io } from "./shared/socket.service";
import { Ajax } from "./shared/ajax.service";
import { GlobalValue } from "./shared/global_value.service";
import { Chat } from './dashboard/shared/chat.service.js';
import { ChatDatePipe } from "./shared/pips.service";


//import { routing } from './app.routes';


import { OrganizeresComponent } from "./dashboard/organizeres/organizeres.component.js";
import { GrouptreeComponent } from "./dashboard/grouptree/grouptree.component.js";
import { RoomListComponent } from "./dashboard/room_list/roomlist.component.js";
import { SingleRoomComponent } from "./dashboard/shared/single-room.component.js";
import {
    ChatPanelComponent,
    SingleMsgComponent,
    InputBoxDirective,
    updateFileDirective,
    RoomDetailComponent,
    UserImgComponent
} from "./dashboard/chat_panel/chat-panel.component.js";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        Login,
        DashboardComponent,
        OrganizeresComponent,
        SingleRoomComponent,
        ChatPanelComponent,
        SingleMsgComponent,
        ChatDatePipe,
        InputBoxDirective,
        updateFileDirective,
        RoomListComponent,
        RoomTabComponent,
        RoomDetailComponent,
        GrouptreeComponent,
        UserImgComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        GlobalValue,
        Io,
        Ajax,
        Chat
    ]
})
export class AppModule {}
