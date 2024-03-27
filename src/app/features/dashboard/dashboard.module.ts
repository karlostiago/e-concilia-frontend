import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardInfoComponent} from './dashboard-card/dashboard-info.component';
import {ChartModule} from "primeng/chart";
import {
    DashboardGraficoVendaUltimoSeteDiasComponent
} from './dashboard-grafico-venda-semanal/dashboard-grafico-venda-ultimo-sete-dias.component';
import {
    DashboardGraficoVendaUltimoSeteDiasCreditoDebitoComponent
} from './dashboard-grafico-venda-semanal-credito-debito/dashboard-grafico-venda-ultimo-sete-dias-credito-debito.component';
import {
    DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent
} from "./dashboard-grafico-venda-semanal-dinheiro-pix/dashboard-grafico-venda-ultimo-sete-dias-dinheiro-pix.component";
import {
    DashboardGraficoVendaUltimoSeteDiasPercentualComponent
} from "./dashboard-grafico-venda-percentual/dashboard-grafico-venda-ultimo-sete-dias-percentual.component";
import {
    DashboardGraficoVendaMensalComponent
} from "./dashboard-grafico-venda-mensal/dashboard-grafico-venda-mensal.component";
import { DashboardGraficoVendaAnualComponent } from './dashboard-grafico-venda-anual/dashboard-grafico-venda-anual.component';

@NgModule({
    declarations: [
        DashboardInfoComponent,
        DashboardGraficoVendaUltimoSeteDiasComponent,
        DashboardGraficoVendaUltimoSeteDiasCreditoDebitoComponent,
        DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent,
        DashboardGraficoVendaUltimoSeteDiasPercentualComponent,
        DashboardGraficoVendaMensalComponent,
        DashboardGraficoVendaAnualComponent
    ],
    exports: [
        DashboardInfoComponent,
        ChartModule,
        DashboardGraficoVendaUltimoSeteDiasComponent,
        DashboardGraficoVendaUltimoSeteDiasCreditoDebitoComponent,
        DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent,
        DashboardGraficoVendaUltimoSeteDiasPercentualComponent,
        DashboardGraficoVendaMensalComponent,
        DashboardGraficoVendaAnualComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartModule
    ]
})
export class DashboardModule {
}
