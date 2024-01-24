import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {IfoodComponent} from "./ifood/ifood.component";
import {CanActivate} from "../../auth.guard";

const rotas: Routes = [
    {
        path: 'consulta/conciliador/ifood',
        component: IfoodComponent,
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
export class ConciliadorRoutingModule {
}
