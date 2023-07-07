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
import {ContratoRoutingModule} from "../taxa/contrato-routing.module";

@NgModule({
    declarations: [
        ContratoCadastroComponent,
        ContratoConsultaComponent,
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
        ContratoRoutingModule
    ]
})
export class ContratoModule { }
