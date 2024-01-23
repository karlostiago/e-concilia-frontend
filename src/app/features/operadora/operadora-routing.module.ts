import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OperadoraCadastroComponent} from "./operadora-cadastro/operadora-cadastro.component";
import {OperadoraConsultaComponent} from "./operadora-consulta/operadora-consulta.component";
import {AuthGuard} from "../seguranca/auth.guard";

const rotas: Routes = [
    {
        path: 'cadastro/operadoras/novo',
        component: OperadoraCadastroComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'consulta/operadoras',
        component: OperadoraConsultaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'editar/operadoras/:id',
        component: OperadoraCadastroComponent,
        canActivate: [AuthGuard]
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
export class OperadoraRoutingModule {
}
