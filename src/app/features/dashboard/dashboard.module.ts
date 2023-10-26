import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { DashboardInfoComponent } from './dashboard-card/dashboard-info.component';
import {ChartModule} from "primeng/chart";

import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import { DashboardGraficoVendaUltimoSeteDiasComponent } from './dashboard-grafico-venda-ultimo-sete-dias/dashboard-grafico-venda-ultimo-sete-dias.component';

@NgModule({
    declarations: [
        DashboardInfoComponent,
        DashboardGraficoVendaUltimoSeteDiasComponent
    ],
    exports: [
        DashboardInfoComponent,
        ChartModule,
        DashboardGraficoVendaUltimoSeteDiasComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartModule
    ]
})
export class DashboardModule { }
