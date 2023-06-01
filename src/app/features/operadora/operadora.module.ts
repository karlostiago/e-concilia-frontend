import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OperadoraCadastroComponent} from './operadora-cadastro/operadora-cadastro.component';
import {InputTextModule} from "primeng/inputtext";
import {InputSwitchModule} from "primeng/inputswitch";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {InputMaskModule} from "primeng/inputmask";
import {InputNumberModule} from "primeng/inputnumber";


@NgModule({
    declarations: [
        OperadoraCadastroComponent
    ],
    exports: [
        OperadoraCadastroComponent
    ],
    imports: [
        CommonModule,
        InputTextModule,
        InputSwitchModule,
        ButtonModule,
        TableModule,
        DialogModule,
        InputMaskModule,
        InputNumberModule
    ]
})
export class OperadoraModule { }
