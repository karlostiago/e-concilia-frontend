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
import { OperadoraConsultaComponent } from './operadora-consulta/operadora-consulta.component';
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {RouterLink} from "@angular/router";


@NgModule({
    declarations: [
        OperadoraCadastroComponent,
        OperadoraConsultaComponent
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
        InputNumberModule,
        FormsModule,
        CalendarModule,
        CurrencyMaskModule,
        RouterLink
    ]
})
export class OperadoraModule { }
