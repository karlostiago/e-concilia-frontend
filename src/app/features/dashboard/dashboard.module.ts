import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { DashboardInfoComponent } from './dashboard-card/dashboard-info.component';

@NgModule({
    declarations: [
        DashboardInfoComponent
    ],
    exports: [
        DashboardInfoComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
