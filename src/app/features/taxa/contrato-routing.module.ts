import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TaxaConsultaComponent} from "./taxa-consulta/taxa-consulta.component";
import {ContratoCadastroComponent} from "../contrato/contrato-cadastro/contrato-cadastro.component";
import {ContratoConsultaComponent} from "../contrato/contrato-consulta/contrato-consulta.component";

const rotas: Routes = [
    { path: 'cadastro/contratos/novo', component: ContratoCadastroComponent },
    { path: 'consulta/contratos', component: ContratoConsultaComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(rotas),
    ],
    exports: [
        RouterModule
    ]
})
export class ContratoRoutingModule {
}
