import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratoCadastroComponent } from './contrato-cadastro/contrato-cadastro.component';
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import {TableModule} from "primeng/table";

@NgModule({
    declarations: [
        ContratoCadastroComponent
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
        TableModule
    ]
})
export class ContratoModule { }
