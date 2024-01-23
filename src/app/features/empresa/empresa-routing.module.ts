import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EmpresaConsultaComponent} from "./empresa-consulta/empresa-consulta.component";
import {EmpresaCadastroComponent} from "./empresa-cadastro/empresa-cadastro.component";
import {AuthGuard} from "../seguranca/auth.guard";

const rotas: Routes = [
    {
        path: 'consulta/empresas',
        component: EmpresaConsultaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cadastro/empresas/novo',
        component: EmpresaCadastroComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'editar/empresas/:id',
        component: EmpresaCadastroComponent,
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
export class EmpresaRoutingModule {
}
