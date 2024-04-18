import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RelatorioRoutingModule} from "./relatorio-routing.module";
import {RelatorioVendaComponent} from "./relatorio-venda/relatorio-venda.component";
import {RelatorioTaxaComponent} from "./relatorio-taxa/relatorio-taxa.component";
import {RelatorioConciliacaoComponent} from "./relatorio-conciliacao/relatorio-conciliacao.component";
import { RelatorioFiltroComponent } from './relatorio-filtro/relatorio-filtro.component';
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        RelatorioVendaComponent,
        RelatorioTaxaComponent,
        RelatorioConciliacaoComponent,
        RelatorioFiltroComponent
    ],
    imports: [
        CommonModule,
        RelatorioRoutingModule,
        CalendarModule,
        DropdownModule,
        FormsModule
    ]
})
export class RelatorioModule { }
