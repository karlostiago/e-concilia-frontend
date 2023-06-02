import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {EmpresaModule} from "./features/empresa/empresa.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ContratoModule} from "./features/contrato/contrato.module";
import {CoreModule} from "./core/core.module";
import {RouterModule, Routes} from "@angular/router";
import {EmpresaCadastroComponent} from "./features/empresa/empresa-cadastro/empresa-cadastro.component";
import {ContratoCadastroComponent} from "./features/contrato/contrato-cadastro/contrato-cadastro.component";
import {OperadoraCadastroComponent} from "./features/operadora/operadora-cadastro/operadora-cadastro.component";
import {OperadoraModule} from "./features/operadora/operadora.module";
import {SharedModule} from "./shared/shared.module";
import {EmpresaConsultaComponent} from "./features/empresa/empresa-consulta/empresa-consulta.component";

const rotas: Routes = [
    { path: 'empresas', component: EmpresaConsultaComponent },
    { path: 'empresas/novo', component: EmpresaCadastroComponent },

    { path: 'contratos/novo', component: ContratoCadastroComponent },
    { path: 'operadoras/novo', component: OperadoraCadastroComponent }
]

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        InputTextModule,
        ButtonModule,
        EmpresaModule,
        ContratoModule,
        OperadoraModule,
        CoreModule,
        SharedModule,
        RouterModule.forRoot(rotas)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
