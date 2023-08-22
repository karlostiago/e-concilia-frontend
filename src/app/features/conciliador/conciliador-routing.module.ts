import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ConciliadoresComponent} from "./conciliadores/conciliadores.component";
import {ConciliadorIfoodComponent} from "./conciliador-ifood/conciliador-ifood.component";

const rotas: Routes = [
    { path: 'consulta/conciliadores', component: ConciliadoresComponent },
    { path: 'consulta/conciliador/ifood', component: ConciliadorIfoodComponent }
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
