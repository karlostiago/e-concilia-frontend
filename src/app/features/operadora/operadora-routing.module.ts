import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OperadoraCadastroComponent} from "./operadora-cadastro/operadora-cadastro.component";
import {OperadoraConsultaComponent} from "./operadora-consulta/operadora-consulta.component";
import {CanActivate} from "../../auth.guard";

const rotas: Routes = [
    {
        path: 'cadastro/operadoras/novo',
        component: OperadoraCadastroComponent,
        canActivate: [CanActivate]
    },
    {
        path: 'consulta/operadoras',
        component: OperadoraConsultaComponent,
        canActivate: [CanActivate]
    },
    {
        path: 'editar/operadoras/:id',
        component: OperadoraCadastroComponent,
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
export class OperadoraRoutingModule {
}
