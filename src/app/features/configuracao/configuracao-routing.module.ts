import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {
    VinculaEmpresaOperadoraCadastroComponent
} from "./vincula-empresa-operadora-cadastro/vincula-empresa-operadora-cadastro.component";
import {
    VinculaEmpresaOperadoraConsultaComponent
} from "./vincula-empresa-operadora-consulta/vincula-empresa-operadora-consulta.component";


const rotas: Routes = [
    { path: 'cadastro/configuracao/vincula/empresa/operadora', component: VinculaEmpresaOperadoraCadastroComponent },
    { path: 'editar/configuracao/vincula/empresa/operadora/:id', component: VinculaEmpresaOperadoraCadastroComponent },
    { path: 'consulta/configuracao/vincula/empresa/operadora', component: VinculaEmpresaOperadoraConsultaComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(rotas),
    ],
    exports: [
        RouterModule
    ]
})
export class ConfiguracaoRoutingModule {
}
