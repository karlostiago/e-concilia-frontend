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
            if (this.filtroRelatorio.tipoRelatorio === 'CSV') {
                this.csv();
            } else {
                this.pdf();
            }
        }
    }

    private csv() {
        this.relatorioService.buscarTaxas(this.filtroRelatorio.dataInicial, this.filtroRelatorio.dataFinal, this.filtroRelatorio.empresaId, this.filtroRelatorio.operadoraId, this.filtroRelatorio.tipoRelatorio).then(response => {
            this.relatorioService.gerarCSV("Relatorio_Taxas", response as Blob, this.alertaService);
        });
    }

    private pdf() {
        this.relatorioService.buscarTaxas(this.filtroRelatorio.dataInicial, this.filtroRelatorio.dataFinal, this.filtroRelatorio.empresaId, this.filtroRelatorio.operadoraId, this.filtroRelatorio.tipoRelatorio).then(response => {
            const detalhes = response as any[];
            this.relatorioService.gerarPDF(this.getDetalhePDF(detalhes), this.getCabecalhoPDF(), detalhes[0].info, "Relatorio_Taxas", false);
        });
    }

    private getDetalhePDF(detalhe: any []) {
        return Array.from(detalhe, (item, index) => ([
            index + 1,
            item.descricao,
            item.valor,
            item.entraEmVigor,
            item.validoAte,
            item.tipo,
            item.ativo
        ]));
    }

    private getCabecalhoPDF() {
        return [
            {
                title: "#",
                style: {
                    width: 10,
                    fontSize: 14
                }
            },
            {
                title: "Descrição",
                style: {
                    width: 50,
                    fontSize: 14
                }
            },
            {
                title: "Valor",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Data inicial",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Data final",
                style: {
                    width: 25,
                    fontSize: 14
                }
            },
            {
                title: "Tipo",
                style: {
                    width: 40,
                    fontSize: 14
                }
            },
            {
                title: "Ativo",
                style: {
                    width: 20,
                    fontSize: 14
                }
            }
        ];
    }
}
