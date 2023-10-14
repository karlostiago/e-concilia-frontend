import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardInicialComponent} from "./dashboard-inicial/dashboard-inicial.component";

const rotas: Routes = [
    { path: 'dashboard/inicial', component: DashboardInicialComponent }
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
