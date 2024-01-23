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
import { PermissaoCadastroComponent } from './seguranca/permissao-cadastro/permissao-cadastro.component';
import { PermissaoConsultaComponent } from './seguranca/permissao-consulta/permissao-consulta.component';
import {AuthGuard} from "../seguranca/auth.guard";


const rotas: Routes = [
    {
        path: 'configuracao/cadastro/integracoes/novo',
        component: IntegracaoCadastroComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'configuracao/editar/integracoes/:id',
        component: IntegracaoCadastroComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'configuracao/consulta/integracoes',
        component: IntegracaoConsultaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'configuracao/cadastro/usuarios/novo',
        component: UsuarioCadastroComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'configuracao/editar/usuarios/:id',
        component: UsuarioCadastroComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'configuracao/consulta/usuarios',
        component: UsuarioConsultaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'configuracao/cadastro/importacoes/agendar',
        component: ImportacaoCadastroComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'configuracao/cadastro/usuarios/novo',
        component: UsuarioCadastroComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'configuracao/editar/usuarios/:id',
        component: UsuarioCadastroComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'configuracao/consulta/usuarios',
        component: UsuarioConsultaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'configuracao/cadastro/permissoes/novo',
        component: PermissaoCadastroComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'configuracao/consulta/permissoes',
        component: PermissaoConsultaComponent,
        canActivate: [AuthGuard]
    }
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
