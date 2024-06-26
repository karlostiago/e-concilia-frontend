import {Component, OnInit} from '@angular/core';
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {GraficoVendaPercentualFormaPagamento} from "../../../model/GraficoVendaPercentualFormaPagamento";

@Component({
    selector: 'app-dashboard-grafico-venda-ultimo-sete-dias-percentual',
    templateUrl: './dashboard-grafico-venda-ultimo-sete-dias-percentual.component.html',
    styleUrls: ['./dashboard-grafico-venda-ultimo-sete-dias-percentual.component.css']
})
export class DashboardGraficoVendaUltimoSeteDiasPercentualComponent implements OnInit {

    data: any;
    options: any;
    grafico = new GraficoVendaPercentualFormaPagamento();

    ngOnInit(): void {

    }

    atualizar(grafico: GraficoVendaPercentualFormaPagamento) {
        this.grafico = grafico;
        this.getData();
        this.getOptions();
    }

    private getData() {
        const documentStyle = getComputedStyle(document.documentElement);
        this.data = {
            labels: ['Crédito', 'Débito', 'Dinheiro', 'Pix', 'Outros'],
            datasets: [
                {
                    data: this.grafico.data,
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--red-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--red-400')],
                    borderWidth: 0
                }
            ]
        };
    }

    private getOptions() {
        this.options = {
            cutout: '55%',
            plugins: {
                datalabels: {
                    align: 'start',
                    anchor: 'end',
                    color: '#fff',
                    font: {
                        weight: '100',
                        size: 11
                    },
                    formatter: function (valor: number) {
                        return FormatacaoMoedaPtBR.percentual(valor);
                    }
                },
                tooltip: {
                    enabled: false
                },
                legend: {
                    display: true,
                },
                title: {
                    display: true,
                    text: 'Percentual de vendas por forma de pagamento',
                    fontSize: 10
                }
            }
        };
    }
}
