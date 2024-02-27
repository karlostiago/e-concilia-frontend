import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CanActivate} from "../../auth.guard";
import {ConsultaNotificacaoComponent} from "./notificacao-consulta/consulta-notificacao.component";

const rotas: Routes = [
    {
        path: 'consulta/notificacoes',
        component: ConsultaNotificacaoComponent,
        canActivate: [CanActivate]
    },
    {
        path: 'marcar-como-lida/:id',
        component: ConsultaNotificacaoComponent,
        canActivate: [CanActivate]
    },
    {
        path: 'marcar-como-resolvida/:id',
        component: ConsultaNotificacaoComponent,
        canActivate: [CanActivate]
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
export class NotificacaoRoutingModule {
}
