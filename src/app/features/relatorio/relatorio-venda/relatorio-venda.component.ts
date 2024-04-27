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
            if (this.filtroRelatorio.tipoRelatorio === 'CSV') {
                this.csv();
            } else {
                this.pdf();
            }
        }
    }

    private csv() {
        this.relatorioService.buscarVendas(this.filtroRelatorio.dataInicial, this.filtroRelatorio.dataFinal, this.filtroRelatorio.empresaId, this.filtroRelatorio.operadoraId, this.filtroRelatorio.tipoRelatorio).then(response => {
            this.relatorioService.gerarCSV("Relatorio_Vendas", response as Blob, this.alertaService);
        });
    }

    private pdf() {
        this.relatorioService.buscarVendas(this.filtroRelatorio.dataInicial, this.filtroRelatorio.dataFinal, this.filtroRelatorio.empresaId, this.filtroRelatorio.operadoraId, this.filtroRelatorio.tipoRelatorio).then(response => {
            const detalhes = response as any[];
            console.log(detalhes);
            this.relatorioService.gerarPDF(this.getDetalhePDF(detalhes), this.getCabecalhoPDF(), detalhes[0].info, "Relatorio_Vendas", true);
        });
    }

    private getDetalhePDF(detalhe: any []) {
        return Array.from(detalhe, (item, index) => ([
            index + 1,
            item.dataPedido,
            item.numeroDocumento,
            item.razaoSocial,
            item.formaPagamento,
            item.responsavel,
            item.valorBruto,
            item.valorParcial,
            item.valorCancelado,
            item.valorComissao,
            item.valorTaxaEntrega,
            item.valorTaxaServico,
            item.taxaComissao,
            item.taxaComissaoPagamento
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
                title: "Dt. pedido",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Nro. doc",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Razão social",
                style: {
                    width: 25,
                    fontSize: 14
                }
            },
            {
                title: "Forma Pag.",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Responsável",
                style: {
                    width: 25,
                    fontSize: 14
                }
            },
            {
                title: "Vr. bruto",
                style: {
                    width: 15,
                    fontSize: 14
                }
            },
            {
                title: "Vr. parcial",
                style: {
                    width: 17,
                    fontSize: 14
                }
            },
            {
                title: "Vr. cancel",
                style: {
                    width: 17,
                    fontSize: 14
                }
            },
            {
                title: "Comissão",
                style: {
                    width: 17,
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
                title: "Tx. serviço",
                style: {
                    width: 20,
                    fontSize: 14
                }
            },
            {
                title: "Tx. comissão",
                style: {
                    width: 22,
                    fontSize: 14
                }
            },
            {
                title: "Tx. comissão pag.",
                style: {
                    width: 20,
                    fontSize: 14
                }
            }
        ];
    }
}
