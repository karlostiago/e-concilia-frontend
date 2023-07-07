import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EmpresaConsultaComponent} from "./empresa-consulta/empresa-consulta.component";
import {EmpresaCadastroComponent} from "./empresa-cadastro/empresa-cadastro.component";

const rotas: Routes = [
    { path: 'consulta/empresas', component: EmpresaConsultaComponent },
    { path: 'cadastro/empresas/novo', component: EmpresaCadastroComponent },
    { path: 'editar/empresas/:id', component: EmpresaCadastroComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(rotas),
    ],
    exports: [
        RouterModule
    ]
})
export class EmpresaRoutingModule {
}
