import {Component, OnInit} from '@angular/core';
import {FiltroRelatorio} from "../../../filter/FiltroRelatorio";
import {RelatorioService} from "../relatorio.service";
import {AlertaService} from "../../../shared/alerta/alerta.service";

@Component({
  selector: 'app-relatorio-taxa',
  templateUrl: './relatorio-taxa.component.html',
  styleUrls: ['./relatorio-taxa.component.css']
})
export class RelatorioTaxaComponent implements OnInit {

    filtroRelatorio = new FiltroRelatorio(this.alertaService);

    constructor(private relatorioService: RelatorioService,
                private alertaService: AlertaService) { }

    ngOnInit(): void { }

    gerar() {
        const validado = this.filtroRelatorio.validar();

        if (validado) {
            this.relatorioService.buscarTaxas(this.filtroRelatorio.dataInicial, this.filtroRelatorio.dataFinal, this.filtroRelatorio.empresaId, this.filtroRelatorio.operadoraId, this.filtroRelatorio.tipoRelatorio).then(response => {
                this.relatorioService.gerarCSV("Relatorio_Taxas", response as Blob, this.alertaService);
            });
        }
    }
}
