import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConciliadorRoutingModule} from "./conciliador-routing.module";
import {FormsModule} from "@angular/forms";
import { IfoodComponent } from './ifood/ifood.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [
      IfoodComponent
  ],
    imports: [
        CommonModule,
        ConciliadorRoutingModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        TableModule
    ]
})
export class ConciliadorModule { }
