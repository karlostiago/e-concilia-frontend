import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {TagModule} from "primeng/tag";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {TaxaModule} from "../features/taxa/taxa.module";
import {EmpresaModule} from "../features/empresa/empresa.module";
import {ContratoModule} from "../features/contrato/contrato.module";
import {OperadoraModule} from "../features/operadora/operadora.module";
import {ConciliadorModule} from "../features/conciliador/conciliador.module";
import {ConfiguracaoModule} from "../features/configuracao/configuracao.module";
import {DashboardModule} from "../features/dashboard/dashboard.module";
import {SegurancaModule} from "../features/seguranca/seguranca.module";
import {SegurancaService} from "../features/seguranca/seguranca.service";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {NotificacaoModule} from "../features/notificacao/notificacao.module";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {RelatorioModule} from "../features/relatorio/relatorio.module";

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
        BreadcrumbComponent,
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        BreadcrumbComponent,
        ConfirmDialogModule,

        TaxaModule,
        EmpresaModule,
        ContratoModule,
        OperadoraModule,
        ConciliadorModule,
        ConfiguracaoModule,
        DashboardModule,
        SegurancaModule,
        RelatorioModule
    ],
    imports: [
        CommonModule,
        RouterLink,
        TagModule,
        ConfirmDialogModule,
        DialogModule,
        TableModule,
        NotificacaoModule,
        BreadcrumbModule
    ],
    providers: [
        ConfirmationService,
        SegurancaService
    ]
})
export class CoreModule {
}
