import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {TagModule} from "primeng/tag";

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
        BreadcrumbComponent
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        BreadcrumbComponent
    ],
    imports: [
        CommonModule,
        RouterLink,
        TagModule
    ]
})
export class CoreModule { }
