import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    VinculaEmpresaOperadoraCadastroComponent
} from './vincula-empresa-operadora-cadastro/vincula-empresa-operadora-cadastro.component';
import {ConfiguracaoRoutingModule} from "./configuracao-routing.module";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {
    VinculaEmpresaOperadoraConsultaComponent
} from './vincula-empresa-operadora-consulta/vincula-empresa-operadora-consulta.component';
import {TableModule} from "primeng/table";
import {CnpjModule} from "../../pipes/cnpj/cnpj.module";

@NgModule({
    declarations: [
        VinculaEmpresaOperadoraCadastroComponent,
        VinculaEmpresaOperadoraConsultaComponent
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
