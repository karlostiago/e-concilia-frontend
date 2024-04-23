import {Component, OnInit} from '@angular/core';
import {FiltroRelatorio} from "../../../filter/FiltroRelatorio";
import {AlertaService} from "../../../shared/alerta/alerta.service";
import {RelatorioService} from "../relatorio.service";

@Component({
  selector: 'app-relatorio-conciliacao',
  templateUrl: './relatorio-conciliacao.component.html',
  styleUrls: ['./relatorio-conciliacao.component.css']
})
export class RelatorioConciliacaoComponent implements OnInit {

    filtroRelatorio = new FiltroRelatorio(this.alertaService);

    constructor(private relatorioService: RelatorioService,
                private alertaService: AlertaService) { }

    ngOnInit(): void {

    }

    gerar() {
        const validado = this.filtroRelatorio.validar();

        if (validado) {
            this.relatorioService.buscarConciliacao(this.filtroRelatorio.dataInicial, this.filtroRelatorio.dataFinal, this.filtroRelatorio.empresaId, this.filtroRelatorio.operadoraId, this.filtroRelatorio.tipoRelatorio).then(response => {
                this.relatorioService.gerarCSV("Relatorio_Conciliacao", response as Blob, this.alertaService);
            });
        }
    }
}
