import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { DashboardInfoComponent } from './dashboard-card/dashboard-info.component';
import {ChartModule} from "primeng/chart";

import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import { DashboardGraficoVendaUltimoSeteDiasComponent } from './dashboard-grafico-venda-ultimo-sete-dias/dashboard-grafico-venda-ultimo-sete-dias.component';
import { DashboardGraficoVendaUltimoSeteDiasMeioPagamentoComponent } from './dashboard-grafico-venda-ultimo-sete-dias-meio-pagamento/dashboard-grafico-venda-ultimo-sete-dias-meio-pagamento.component';

@NgModule({
    declarations: [
        DashboardInfoComponent,
        DashboardGraficoVendaUltimoSeteDiasComponent,
        DashboardGraficoVendaUltimoSeteDiasMeioPagamentoComponent
    ],
    exports: [
        DashboardInfoComponent,
        ChartModule,
        DashboardGraficoVendaUltimoSeteDiasComponent,
        DashboardGraficoVendaUltimoSeteDiasMeioPagamentoComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartModule
    ]
})
export class DashboardModule { }
