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
import {CnpjPipe} from "../../pipes/cnpj.pipe";


@NgModule({
    declarations: [
        EmpresaCadastroComponent,
        EmpresaConsultaComponent,
        CnpjPipe
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
        InputSwitchModule
    ]
})
export class EmpresaModule { }
