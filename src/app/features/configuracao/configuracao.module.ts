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

@NgModule({
    declarations: [
        IntegracaoCadastroComponent,
        IntegracaoConsultaComponent
    ],
    imports: [
        CommonModule,
        ConfiguracaoRoutingModule,
        FormsModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
        TableModule,
        CnpjModule
    ]
})
export class ConfiguracaoModule { }
