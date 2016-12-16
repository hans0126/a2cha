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


import { routing } from './app.routes';
import { GlobalValue } from "./shared/global_value.service";

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
        Login, Dashboard
    ],
    bootstrap: [AppComponent],
    providers: [
        GlobalValue,
        Io,
        Ajax
    ]
})
export class AppModule {}
