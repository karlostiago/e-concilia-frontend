import {Component, OnInit} from '@angular/core';
import {Event, NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

    constructor(private router: Router) {
    }

    url: string;

    ngOnInit(): void {
        this.router.events.subscribe((e: Event) => {
            if (e instanceof NavigationStart) {
                this.montarURL(e.url);
            }
        });
    }

    montarURL(url: string) {
        this.url = "/ inicial";

        const palavras = url.split("/");
        let contador = 1;

        if (palavras.length == 2) {
            return;
        }

        for (const palavra of palavras) {
            this.url += palavra;
            if (contador < palavras.length) this.url += " / ";
            contador++;
        }
    }
}
