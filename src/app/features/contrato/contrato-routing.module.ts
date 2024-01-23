import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ContratoCadastroComponent} from "./contrato-cadastro/contrato-cadastro.component";
import {ContratoConsultaComponent} from "./contrato-consulta/contrato-consulta.component";
import {AuthGuard} from "../seguranca/auth.guard";

const rotas: Routes = [
    {
        path: 'cadastro/contratos/novo',
        component: ContratoCadastroComponent,
        canActivate: [AuthGuard] },
    {
        path: 'consulta/contratos',
        component: ContratoConsultaComponent,
        canActivate: [AuthGuard] },
    {
        path: 'editar/contratos/:numero',
        component: ContratoCadastroComponent,
        canActivate: [AuthGuard] },
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
