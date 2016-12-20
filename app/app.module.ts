import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
//componet
import { AppComponent } from './app.component';
import { Login } from './login/login.component.js';
import { Dashboard } from './dashboard/dashboard.component.js';

//service
import { Io } from "./shared/socket.service";
import { Ajax } from "./shared/ajax.service";
import { GlobalValue } from "./shared/global_value.service";
import { Chat } from './dashboard/shared/chat.service.js';


import { routing } from './app.routes';


import { Organizeres } from "./dashboard/organizeres/organizeres.component.js";
import { SingleRoom } from "./dashboard/shared/single-room.component.js";
import { ChatPanel,SingleMsg } from "./dashboard/chat_panel/chat-panel.component.js";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing,
        FormsModule
    ],
    declarations: [
        AppComponent,
        Login,
        Dashboard,
        Organizeres,
        SingleRoom,
        ChatPanel,
        SingleMsg
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
