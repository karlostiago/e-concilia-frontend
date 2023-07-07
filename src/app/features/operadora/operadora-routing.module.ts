import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OperadoraCadastroComponent} from "./operadora-cadastro/operadora-cadastro.component";
import {OperadoraConsultaComponent} from "./operadora-consulta/operadora-consulta.component";

const rotas: Routes = [
    { path: 'cadastro/operadoras/novo', component: OperadoraCadastroComponent },
    { path: 'consulta/operadoras', component: OperadoraConsultaComponent },
    { path: 'editar/operadoras/:id', component: OperadoraCadastroComponent },
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
