import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SegurancaRoutingModule} from "./seguranca-routing.module";
import {AuthGuard} from "./auth.guard";
import {SegurancaService} from "./seguranca.service";



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SegurancaRoutingModule
    ],
    providers: [
        AuthGuard,
        SegurancaService
    ]
})
export class SegurancaModule { }
