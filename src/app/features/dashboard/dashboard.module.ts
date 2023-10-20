import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { DashboardInfoComponent } from './dashboard-card/dashboard-info.component';
import {ChartModule} from "primeng/chart";

import * as ChartDataLabels from 'chartjs-plugin-datalabels';

@NgModule({
    declarations: [
        DashboardInfoComponent
    ],
    exports: [
        DashboardInfoComponent,
        ChartModule
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartModule
    ]
})
export class DashboardModule { }
