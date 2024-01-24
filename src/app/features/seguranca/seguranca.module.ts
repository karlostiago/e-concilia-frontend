import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SegurancaRoutingModule} from "./seguranca-routing.module";
import {SegurancaService} from "./seguranca.service";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SegurancaRoutingModule
    ],
    providers: [
        SegurancaService
    ]
})
export class SegurancaModule { }
