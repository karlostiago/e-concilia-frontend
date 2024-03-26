import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {GraficoVendaUltimo7DiaDinheiroPix} from "../../../model/GraficoVendaUltimo7DiaDinheiroPix";
import {NumberHelper} from "../../../../helpers/NumberHelper";

@Component({
    selector: 'app-dashboard-grafico-venda-ultimo-sete-dias-dinheiro-pix',
    templateUrl: './dashboard-grafico-venda-ultimo-sete-dias-dinheiro-pix.component.html',
    styleUrls: ['./dashboard-grafico-venda-ultimo-sete-dias-dinheiro-pix.component.css']
})
export class DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent implements OnInit {

    data: any;
    options: any;
    graficoVendaUltimo7DiaDinheiroPix = new GraficoVendaUltimo7DiaDinheiroPix();

    @Input() empresas = new Array<string>();

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit(): void {

    }

    atualizar() {
        this.dashboardService.buscarVendasUltimos7DiasDinheiroPix(this.empresas.join(',')).then(data => {
            this.graficoVendaUltimo7DiaDinheiroPix = data;
            const max = NumberHelper.max(50, 50, ...data.dataCash, ...data.dataPix);

            this.getData();
            this.getOptions(max);
        });
    }

    private getData() {
        const documentStyle = getComputedStyle(document.documentElement);
        this.data = {
            labels: this.graficoVendaUltimo7DiaDinheiroPix.labels,
            datasets: [
                {
                    label: 'Dinheiro',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    hoverBackgroundColor: documentStyle.getPropertyValue('--blue-400'),
                    borderWidth: 0,
                    data: this.graficoVendaUltimo7DiaDinheiroPix.dataCash
                },
                {
                    label: 'Pix',
                    backgroundColor: documentStyle.getPropertyValue('--teal-500'),
                    hoverBackgroundColor: documentStyle.getPropertyValue('--teal-400'),
                    borderWidth: 0,
                    data: this.graficoVendaUltimo7DiaDinheiroPix.dataPix
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
                    enabled: false,
                },
                legend: {
                    display: true,
                },
                title: {
                    display: true,
                    text: 'Vendas semanal em dinheiro e pix',
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
