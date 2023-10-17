import {Component, OnInit} from '@angular/core';
import {Venda} from "../../../model/Venda";

@Component({
  selector: 'app-dashboard-inicial',
  templateUrl: './dashboard-inicial.component.html',
  styleUrls: ['./dashboard-inicial.component.css']
})
export class DashboardInicialComponent implements OnInit {

    vendas = new Array<Venda>();
    dtInicial = new Date();
    dtFinal = new Date();

    ngOnInit(): void {
    }

}
