import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaxaConsultaComponent} from "./taxa-consulta/taxa-consulta.component";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {TaxaRoutingModule} from "./taxa-routing.module";

@NgModule({
    declarations: [
        TaxaConsultaComponent
    ],
    imports: [
        CommonModule,
        DropdownModule,
        ButtonModule,
        TableModule,
        TaxaRoutingModule
    ]
})
export class TaxaModule {
}
