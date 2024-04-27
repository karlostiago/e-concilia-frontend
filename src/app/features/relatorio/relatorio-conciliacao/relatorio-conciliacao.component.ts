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
        this.relatorioService.buscarConciliacao(this.filtroRelatorio.dataInicial, this.filtroRelatorio.dataFinal, this.filtroRelatorio.empresaId, this.filtroRelatorio.operadoraId, this.filtroRelatorio.tipoRelatorio).then(response => {
            this.relatorioService.gerarCSV("Relatorio_Conciliacao", response as Blob, this.alertaService);
        });
    }

    private pdf() {
        this.relatorioService.buscarConciliacao(this.filtroRelatorio.dataInicial, this.filtroRelatorio.dataFinal, this.filtroRelatorio.empresaId, this.filtroRelatorio.operadoraId, this.filtroRelatorio.tipoRelatorio).then(response => {
            const detalhes = response as any[];
            this.relatorioService.gerarPDF(this.getDetalhePDF(detalhes), this.getCabecalhoPDF(), detalhes[0].info, "Relatorio_Consolidacao", true);
        });
    }

    private getDetalhePDF(detalhe: any []) {
        return Array.from(detalhe, (item, index) => ([
            index + 1,
            item.periodo,
            item.quantidadeVenda,
            item.totalBruto,
            item.ticketMedio,
            item.valorAntecipado,
            item.totalTaxaEntrega,
            item.totalPromocao,
            item.totalTransacaoPagamento,
            item.totalComissao,
            item.totalCancelado,
            item.totalTaxaServico,
            item.totalTaxaManutencao,
            item.totalRepasse
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
                title: "Dt. da venda",
                style: {
                    width: 25,
                    fontSize: 14
                }
            },
            {
                title: "Qtd. vendas",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Vr. bruto",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Ticket médio",
                style: {
                    width: 25,
                    fontSize: 14
                }
            },
            {
                title: "Vr. antecipado",
                style: {
                    width: 25,
                    fontSize: 14
                }
            },
            {
                title: "Tx. entrega",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Promo.",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Tr. pagmento",
                style: {
                    width: 25,
                    fontSize: 14
                }
            },
            {
                title: "Comissão",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Cancel.",
                style: {
                    width: 15,
                    fontSize: 14
                }
            },
            {
                title: "Tx. serviço",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Tx. manut.",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Repasse",
                style: {
                    width: 20,
                    fontSize: 14
                }
            }
        ];
    }
}
