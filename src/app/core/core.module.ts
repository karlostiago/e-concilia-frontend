import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent
    ],
    exports: [
        NavbarComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class CoreModule { }
