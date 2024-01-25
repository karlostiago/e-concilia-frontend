import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ContratoCadastroComponent} from "./contrato-cadastro/contrato-cadastro.component";
import {ContratoConsultaComponent} from "./contrato-consulta/contrato-consulta.component";
import {CanActivate} from "../../auth.guard";

const rotas: Routes = [
    {
        path: 'cadastro/contratos/novo',
        component: ContratoCadastroComponent,
        canActivate: [CanActivate]
    },
    {
        path: 'consulta/contratos',
        component: ContratoConsultaComponent,
        canActivate: [CanActivate]
    },
    {
        path: 'editar/contratos/:numero',
        component: ContratoCadastroComponent,
        canActivate: [CanActivate]
    }
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
