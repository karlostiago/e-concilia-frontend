import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {IfoodComponent} from "./ifood/ifood.component";
import {AuthGuard} from "../seguranca/auth.guard";

const rotas: Routes = [
    {
        path: 'consulta/conciliador/ifood',
        component: IfoodComponent,
        canActivate: [AuthGuard]
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
