import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EmpresaConsultaComponent} from "./empresa-consulta/empresa-consulta.component";
import {EmpresaCadastroComponent} from "./empresa-cadastro/empresa-cadastro.component";
import {CanActivate} from "../../auth.guard";

const rotas: Routes = [
    {
        path: 'consulta/empresas',
        component: EmpresaConsultaComponent,
        canActivate: [CanActivate]
    },
    {
        path: 'cadastro/empresas/novo',
        component: EmpresaCadastroComponent,
        canActivate: [CanActivate]
    },
    {
        path: 'editar/empresas/:id',
        component: EmpresaCadastroComponent,
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
export class EmpresaRoutingModule {
}
