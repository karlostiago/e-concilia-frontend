import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";


@NgModule({
    declarations: [
        EmpresaCadastroComponent
    ],
    exports: [
        EmpresaCadastroComponent
    ],
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
        InputMaskModule
    ]
})
export class EmpresaModule { }
