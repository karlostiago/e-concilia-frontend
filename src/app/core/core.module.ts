import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {TagModule} from "primeng/tag";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
        BreadcrumbComponent
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        BreadcrumbComponent,
        ConfirmDialogModule
    ],
    imports: [
        CommonModule,
        RouterLink,
        TagModule,
        ConfirmDialogModule
    ],
    providers: [
        ConfirmationService
    ]
})
export class CoreModule { }
