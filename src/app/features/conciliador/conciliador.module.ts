import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConciliadorRoutingModule} from "./conciliador-routing.module";
import {FormsModule} from "@angular/forms";
import { IfoodComponent } from './ifood/ifood.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import { ResumoFinanceiroComponent } from './ifood/resumo-financeiro/resumo-financeiro.component';
import { TaxaComponent } from './ifood/taxa/taxa.component';
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [
      IfoodComponent,
      ResumoFinanceiroComponent,
      TaxaComponent
  ],
    imports: [
        CommonModule,
        ConciliadorRoutingModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        DropdownModule,
        CalendarModule,
        DialogModule
    ]
})
export class ConciliadorModule { }
