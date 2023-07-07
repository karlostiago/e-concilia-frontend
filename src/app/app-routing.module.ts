import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

const rotas: Routes = [ ]

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
