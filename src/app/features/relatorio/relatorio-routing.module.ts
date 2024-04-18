import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CanActivate} from "../../auth.guard";
import {RelatorioVendaComponent} from "./relatorio-venda/relatorio-venda.component";
import {RelatorioTaxaComponent} from "./relatorio-taxa/relatorio-taxa.component";
import {RelatorioConciliacaoComponent} from "./relatorio-conciliacao/relatorio-conciliacao.component";

const rotas: Routes = [
    {
        path: 'relatorio/vendas',
        component: RelatorioVendaComponent,
        canActivate: [CanActivate]
    },
    {
        path: 'relatorio/taxas',
        component: RelatorioTaxaComponent,
        canActivate: [CanActivate]
    },
    {
        path: 'relatorio/conciliacao',
        component: RelatorioConciliacaoComponent,
        canActivate: [CanActivate]
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(rotas),
    ],
    exports: [
        RouterModule
    ]
})
export class RelatorioRoutingModule {
}
