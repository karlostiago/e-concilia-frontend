import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {LoaderModule} from "./core/loader/loader.module";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {DashboardInicialComponent} from './features/dashboard/dashboard-inicial/dashboard-inicial.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";

@NgModule({
    declarations: [
        AppComponent,
        DashboardInicialComponent
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
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
