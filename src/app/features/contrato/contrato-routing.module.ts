import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ContratoCadastroComponent} from "./contrato-cadastro/contrato-cadastro.component";
import {ContratoConsultaComponent} from "./contrato-consulta/contrato-consulta.component";

const rotas: Routes = [
    { path: 'cadastro/contratos/novo', component: ContratoCadastroComponent },
    { path: 'consulta/contratos', component: ContratoConsultaComponent },
    { path: 'editar/contratos/:numero', component: ContratoCadastroComponent },
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
