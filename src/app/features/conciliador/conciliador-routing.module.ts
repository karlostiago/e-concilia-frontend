import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {IfoodComponent} from "./ifood/ifood.component";

const rotas: Routes = [
    { path: 'consulta/conciliador/ifood', component: IfoodComponent }
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
