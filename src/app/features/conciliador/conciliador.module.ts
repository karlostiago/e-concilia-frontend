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
import { ResumoFinanceiroComponent } from './resumo-financeiro/resumo-financeiro.component';

@NgModule({
  declarations: [
      IfoodComponent,
      ResumoFinanceiroComponent
  ],
    imports: [
        CommonModule,
        ConciliadorRoutingModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        DropdownModule,
        CalendarModule
    ]
})
export class ConciliadorModule { }
