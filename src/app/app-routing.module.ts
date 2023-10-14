import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardInicialComponent} from "./features/dashboard/dashboard-inicial/dashboard-inicial.component";

const rotas: Routes = [
    { path: '', component: DashboardInicialComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(rotas),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
