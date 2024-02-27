import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaNotificacaoComponent } from './notificacao-consulta/consulta-notificacao.component';
import {TableModule} from "primeng/table";
import {NotificacaoRoutingModule} from "./notificacao-routing.module";

@NgModule({
    declarations: [
        ConsultaNotificacaoComponent
    ],
    exports: [
        ConsultaNotificacaoComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        NotificacaoRoutingModule
    ]
})
export class NotificacaoModule { }
