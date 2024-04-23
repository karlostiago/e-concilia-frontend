import {Component, OnInit} from '@angular/core';
import {FiltroRelatorio} from "../../../filter/FiltroRelatorio";
import {AlertaService} from "../../../shared/alerta/alerta.service";
import {RelatorioService} from "../relatorio.service";

@Component({
  selector: 'app-relatorio-venda',
  templateUrl: './relatorio-venda.component.html',
  styleUrls: ['./relatorio-venda.component.css']
})
export class RelatorioVendaComponent implements OnInit {

    filtroRelatorio = new FiltroRelatorio(this.alertaService);

    constructor(private relatorioService: RelatorioService,
                private alertaService: AlertaService) { }

    ngOnInit(): void {

    }

    gerar() {
        const validado = this.filtroRelatorio.validar();

        if (validado) {
            this.relatorioService.buscarVendas(this.filtroRelatorio.dataInicial, this.filtroRelatorio.dataFinal, this.filtroRelatorio.empresaId, this.filtroRelatorio.operadoraId, this.filtroRelatorio.tipoRelatorio).then(response => {
                const blob = response as Blob;

                if (blob.size > 0) {
                    const baixar = document.createElement("a");
                    baixar.href = window.URL.createObjectURL(blob);
                    baixar.download = "Relatorio_Vendas.csv";
                    baixar.click();
                } else {
                    this.alertaService.atencao("Nenhum registro encontrado, com os filtros informados.");
                }
            });
        }
    }
}
