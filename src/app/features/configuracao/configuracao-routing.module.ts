import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {
    IntegracaoCadastroComponent
} from "./integracao/integracao-cadastro/integracao-cadastro.component";
import {
    IntegracaoConsultaComponent
} from "./integracao/integracao-consulta/integracao-consulta.component";
import {UsuarioCadastroComponent} from "./seguranca/usuario-cadastro/usuario-cadastro.component";
import {UsuarioConsultaComponent} from "./seguranca/usuario-consulta/usuario-consulta.component";
import {ImportacaoCadastroComponent} from "./importacao/importacao-cadastro/importacao-cadastro.component";

const rotas: Routes = [
    { path: 'configuracao/cadastro/integracoes/novo', component: IntegracaoCadastroComponent },
    { path: 'configuracao/editar/integracoes/:id', component: IntegracaoCadastroComponent },
    { path: 'configuracao/consulta/integracoes', component: IntegracaoConsultaComponent },

    { path: 'configuracao/cadastro/usuarios/novo', component: UsuarioCadastroComponent },
    { path: 'configuracao/editar/usuarios/:id', component: UsuarioCadastroComponent },
    { path: 'configuracao/consulta/usuarios', component: UsuarioConsultaComponent },

    { path: 'configuracao/cadastro/importacoes/agendar', component: ImportacaoCadastroComponent },
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
