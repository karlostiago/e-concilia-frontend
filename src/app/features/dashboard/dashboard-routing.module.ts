import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardInicialComponent} from "./dashboard-inicial/dashboard-inicial.component";
import {AuthGuard} from "../seguranca/auth.guard";

const rotas: Routes = [
    {
        path: 'dashboard/inicial',
        component: DashboardInicialComponent,
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
export class DashboardRoutingModule {
}
