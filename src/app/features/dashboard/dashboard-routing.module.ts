import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardInicialComponent} from "./dashboard-inicial/dashboard-inicial.component";
import {CanActivate} from "../../auth.guard";

const rotas: Routes = [
    {
        path: 'dashboard/inicial',
        component: DashboardInicialComponent,
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
export class DashboardRoutingModule {
}
