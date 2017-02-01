import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login } from './login/login.component.js';
import { Dashboard } from './dashboard/dashboard.component.js';


export const routes: Routes = [{
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    { path: 'login', component: Login },
    { path: 'main', component: Dashboard }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
