import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {LoaderModule} from "./core/loader/loader.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {DashboardInicialComponent} from './features/dashboard/dashboard-inicial/dashboard-inicial.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {UsuarioConsultaComponent} from './features/configuracao/seguranca/usuario-consulta/usuario-consulta.component';
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {LoginComponent} from './features/seguranca/login/login.component';
import {AuthInterceptor} from "./auth.interceptor";


@NgModule({
    declarations: [
        AppComponent,
        DashboardInicialComponent,
        UsuarioConsultaComponent,
        LoginComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        LoaderModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        CalendarModule,
        InputTextModule,
        TableModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
