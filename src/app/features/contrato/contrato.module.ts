import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratoCadastroComponent } from './contrato-cadastro/contrato-cadastro.component';
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ContratoConsultaComponent } from './contrato-consulta/contrato-consulta.component';
import {RouterLink} from "@angular/router";
import {ContratoRoutingModule} from "./contrato-routing.module";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";
import {CurrencyMaskModule} from "ng2-currency-mask";
import { ContratoTaxasComponent } from './contrato-taxas/contrato-taxas.component';
import {RadioButtonModule} from "primeng/radiobutton";

@NgModule({
    declarations: [
        ContratoCadastroComponent,
        ContratoConsultaComponent,
        ContratoTaxasComponent,
    ],
    exports: [
        ContratoCadastroComponent
    ],
    imports: [
        CommonModule,
        InputTextModule,
        DropdownModule,
        ButtonModule,
        InputSwitchModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        ContratoRoutingModule,
        DialogModule,
        CalendarModule,
        CurrencyMaskModule,
        RadioButtonModule
    ]
})
export class ContratoModule { }
