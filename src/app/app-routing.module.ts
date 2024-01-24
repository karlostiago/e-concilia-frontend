import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardInicialComponent} from "./features/dashboard/dashboard-inicial/dashboard-inicial.component";
import {CanActivate} from "./auth.guard";

const rotas: Routes = [
    {
        path: '',
        component: DashboardInicialComponent,
        canActivate: [CanActivate]
    }
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
