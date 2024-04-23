import {Component, OnInit} from '@angular/core';
import {FiltroRelatorio} from "../../../filter/FiltroRelatorio";
import {AlertaService} from "../../../shared/alerta/alerta.service";

@Component({
  selector: 'app-relatorio-conciliacao',
  templateUrl: './relatorio-conciliacao.component.html',
  styleUrls: ['./relatorio-conciliacao.component.css']
})
export class RelatorioConciliacaoComponent implements OnInit {

    filtroRelatorio = new FiltroRelatorio(this.alertaService);

    constructor(private alertaService: AlertaService) {
    }

    ngOnInit(): void {

    }

    gerar() {
        console.log("gerando relatorio de conciliacao", this.filtroRelatorio);
    }
}
