import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {
    IntegracaoCadastroComponent
} from "./integracao/integracao-cadastro/integracao-cadastro.component";
import {
    IntegracaoConsultaComponent
} from "./integracao/integracao-consulta/integracao-consulta.component";

const rotas: Routes = [
    { path: 'cadastro/integracoes/novo', component: IntegracaoCadastroComponent },
    { path: 'editar/integracoes/:id', component: IntegracaoCadastroComponent },
    { path: 'consulta/integracoes', component: IntegracaoConsultaComponent }
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
