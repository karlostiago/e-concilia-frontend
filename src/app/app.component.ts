import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {NavbarService} from "./shared/navbar/navbar.service";

import {Chart} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    exibirMenu = false;

    constructor(private config: PrimeNGConfig,
                private navbarService: NavbarService,
                private router: Router) {

        this.navbarService.data$.subscribe(data => {
            this.exibirMenu = data;
        });
    }

    ngOnInit(): void {
        Chart.register(ChartDataLabels);
        this.config.setTranslation({
            firstDayOfWeek: 1,
            dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
            dayNamesShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb' ],
            dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
            monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
            monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
            today: 'hoje',
            clear: 'Excluir'
        });
    }

    exibirNavBar() {
        return this.router.url !== '/login';
    }
}
