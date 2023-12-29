import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    IntegracaoCadastroComponent
} from './integracao/integracao-cadastro/integracao-cadastro.component';
import {ConfiguracaoRoutingModule} from "./configuracao-routing.module";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {
    IntegracaoConsultaComponent
} from './integracao/integracao-consulta/integracao-consulta.component';
import {TableModule} from "primeng/table";
import {CnpjModule} from "../../pipes/cnpj/cnpj.module";
import {UsuarioCadastroComponent} from "./seguranca/usuario-cadastro/usuario-cadastro.component";
import {MultiSelectModule} from "primeng/multiselect";
import { ImportacaoCadastroComponent } from './importacao/importacao-cadastro/importacao-cadastro.component';
import {CalendarModule} from "primeng/calendar";

@NgModule({
    declarations: [
        IntegracaoCadastroComponent,
        IntegracaoConsultaComponent,
        UsuarioCadastroComponent,
        ImportacaoCadastroComponent
    ],
    imports: [
        CommonModule,
        ConfiguracaoRoutingModule,
        FormsModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
        TableModule,
        CnpjModule,
        MultiSelectModule,
        CalendarModule
    ]
})
export class ConfiguracaoModule { }
