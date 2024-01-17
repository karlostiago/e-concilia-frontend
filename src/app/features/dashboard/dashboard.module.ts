import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardInfoComponent} from './dashboard-card/dashboard-info.component';
import {ChartModule} from "primeng/chart";
import {
    DashboardGraficoVendaUltimoSeteDiasComponent
} from './dashboard-grafico-venda-ultimo-sete-dias/dashboard-grafico-venda-ultimo-sete-dias.component';
import {
    DashboardGraficoVendaUltimoSeteDiasCreditoDebitoComponent
} from './dashboard-grafico-venda-ultimo-sete-dias-credito-debito/dashboard-grafico-venda-ultimo-sete-dias-credito-debito.component';
import {
    DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent
} from "./dashboard-grafico-venda-ultimo-sete-dias-dinheiro-pix/dashboard-grafico-venda-ultimo-sete-dias-dinheiro-pix.component";

@NgModule({
    declarations: [
        DashboardInfoComponent,
        DashboardGraficoVendaUltimoSeteDiasComponent,
        DashboardGraficoVendaUltimoSeteDiasCreditoDebitoComponent,
        DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent
    ],
    exports: [
        DashboardInfoComponent,
        ChartModule,
        DashboardGraficoVendaUltimoSeteDiasComponent,
        DashboardGraficoVendaUltimoSeteDiasCreditoDebitoComponent,
        DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartModule
    ]
})
export class DashboardModule { }
