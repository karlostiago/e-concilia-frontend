import {Component, OnInit} from '@angular/core';
import {GraficoVendaUltimo7DiaCreditoDebito} from "../../../model/GraficoVendaUltimo7DiaCreditoDebito";
import {DashboardService} from "../dashboard.service";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {NumberHelper} from "../../../../helpers/NumberHelper";

@Component({
    selector: 'app-dashboard-grafico-venda-ultimo-sete-dias-credito-debito',
    templateUrl: './dashboard-grafico-venda-ultimo-sete-dias-credito-debito.component.html',
    styleUrls: ['./dashboard-grafico-venda-ultimo-sete-dias-credito-debito.component.css']
})
export class DashboardGraficoVendaUltimoSeteDiasCreditoDebitoComponent implements OnInit {

    data: any;
    options: any;
    graficoVendaUltimo7DiasCreditoDebito = new GraficoVendaUltimo7DiaCreditoDebito();

    empresaInexistente = -1;

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit(): void {
        this.atualizar(this.empresaInexistente);
    }

    atualizar(empresaId: number) {
        this.dashboardService.buscarVendasUltimos7DiasCreditoDebito(empresaId).then(data => {
            this.graficoVendaUltimo7DiasCreditoDebito = data;
            const max = NumberHelper.max(50, 50, ...data.dataCredit, ...data.dataDebit);

            this.getData();
            this.getOptions(max);
        });
    }

    private getData() {
        const documentStyle = getComputedStyle(document.documentElement);
        this.data = {
            labels: this.graficoVendaUltimo7DiasCreditoDebito.labels,
            datasets: [
                {
                    label: 'Cartão crédito',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    hoverBackgroundColor: documentStyle.getPropertyValue('--blue-400'),
                    borderWidth: 0,
                    data: this.graficoVendaUltimo7DiasCreditoDebito.dataCredit
                },
                {
                    label: 'Cartão dédito',
                    backgroundColor: documentStyle.getPropertyValue('--teal-500'),
                    hoverBackgroundColor: documentStyle.getPropertyValue('--teal-400'),
                    borderWidth: 0,
                    data: this.graficoVendaUltimo7DiasCreditoDebito.dataDebit
                }
            ]
        };
    }

    private getOptions(max: number) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                datalabels: {
                    align: 'end',
                    anchor: 'end',
                    font: {
                        weight: '300',
                        size: 11
                    },
                    formatter: function (valor: number) {
                        return FormatacaoMoedaPtBR.monetario(valor);
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
                    text: 'Vendas dos últimos 7 dias em crédito e débito',
                    fontSize: 10,
                    color: textColor
                }
            },
            scales: {
                x: {
                    max: max,
                    stacked: false,
                    ticks: {
                        autoSkip: false,
                        maxRotation: 20,
                        minRotation: 20,
                        color: textColorSecondary,
                        callback: function (valor: number) {
                            return FormatacaoMoedaPtBR.monetario(valor);
                        },
                        font: {
                            weight: 300
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: false,
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}
