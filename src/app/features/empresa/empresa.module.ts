import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmpresaCadastroComponent} from './empresa-cadastro/empresa-cadastro.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {EmpresaConsultaComponent} from "./empresa-consulta/empresa-consulta.component";
import {DividerModule} from "primeng/divider";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {RouterLink} from "@angular/router";
import {EmpresaRoutingModule} from "./empresa-routing.module";
import {CnpjModule} from "../../pipes/cnpj/cnpj.module";

@NgModule({
    declarations: [
        EmpresaCadastroComponent,
        EmpresaConsultaComponent
    ],
    exports: [
        EmpresaCadastroComponent,
        EmpresaConsultaComponent
    ],
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
        InputMaskModule,
        DividerModule,
        TableModule,
        InputSwitchModule,
        RouterLink,
        EmpresaRoutingModule,
        CnpjModule
    ]
})
export class EmpresaModule { }
