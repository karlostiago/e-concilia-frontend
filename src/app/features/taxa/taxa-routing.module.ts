import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TaxaConsultaComponent} from "./taxa-consulta/taxa-consulta.component";
import {CanActivate} from "../../auth.guard";

const rotas: Routes = [
    {
        path: 'consulta/taxas',
        component: TaxaConsultaComponent,
        canActivate: [CanActivate]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(rotas),
    ],
    exports: [
        RouterModule
    ]
})
export class TaxaRoutingModule {
}
