import {Component, OnInit} from '@angular/core';
import {Event, NavigationStart, Router} from "@angular/router";
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

    items: MenuItem[];
    home: MenuItem;

    constructor(private router: Router) {
    }

    url: string;

    ngOnInit(): void {
        this.items = [{label: 'Dashboard'}, {label: 'Inicial'}];
        this.home = { icon: 'pi pi-home', routerLink: '/' };

        this.router.events.subscribe((e: Event) => {
            if (e instanceof NavigationStart) {
                this.montarURL(e.url);
            }
        });
    }

    montarURL(url: string) {
        if (url === '/') {
            url = 'Dashboard/Inicial';
        }

        const arr = url.split('/')
            .filter(pt => pt !== '');

        const newArr = [];

        for (const p of arr) {
            const regex = /\d/;

            if (regex.test(p)) {
                continue;
            }

            newArr.push({
                label: p.charAt(0).toUpperCase() + p.slice(1)
            });
        }

        this.items = newArr;
    }
}
