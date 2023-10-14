import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';

@NgModule({
    declarations: [
    DashboardCardComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
