import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConciliadoresComponent } from './conciliadores/conciliadores.component';
import {ConciliadorRoutingModule} from "./conciliador-routing.module";
import {FormsModule} from "@angular/forms";
import { ConciliadorIfoodComponent } from './conciliador-ifood/conciliador-ifood.component';
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
      ConciliadoresComponent,
      ConciliadorIfoodComponent
  ],
    imports: [
        CommonModule,
        ConciliadorRoutingModule,
        FormsModule,
        ButtonModule
    ]
})
export class ConciliadorModule { }
