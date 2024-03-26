import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {GraficoVendaAnual} from "../../../model/GraficoVendaAnual";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";

@Component({
  selector: 'app-dashboard-grafico-venda-anual',
  templateUrl: './dashboard-grafico-venda-anual.component.html',
  styleUrls: ['./dashboard-grafico-venda-anual.component.css']
})
export class DashboardGraficoVendaAnualComponent implements OnInit {

    data: any;
    options: any;
    graficoVendaAnual = new GraficoVendaAnual();

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {

    }

    atualizar() {
        this.dashboardService.buscarVendaAnual().then(data => {
            this.graficoVendaAnual = data;
            this.getData();
            this.getOptions();
        });
    }

    private getData() {
        const documentStyle = getComputedStyle(document.documentElement);

        this.data = {
            labels: this.graficoVendaAnual.labels,
            datasets: this.getDataSets()
        };
    }

    private getDataSets() {
        const documentStyle = getComputedStyle(document.documentElement);

        const dataSets = [];

        const colors = [
            '--blue-500',
            '--orange-500',
            '--teal-500',
        ]

        let index = 0;

        for (const dataSet of this.graficoVendaAnual.dataSets) {
            const chart = {
                label: dataSet.label,
                data: dataSet.data,
                backgroundColor: documentStyle.getPropertyValue(colors[index]),
                borderWidth: 0
            }

            dataSets.push(chart);
            index++;
        }

        return dataSets;
    }

    private getOptions() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                datalabels: {
                    color: '#fff',
                    font: {
                        weight: '300',
                        size: 10
                    },
                    formatter: function (valor: number) {
                        return FormatacaoMoedaPtBR.monetario(valor);
                    }
                },
                title: {
                    display: true,
                    text: 'Venda anual',
                    fontSize: 10,
                    color: textColor
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary,
                        callback: function (valor: number) {
                            return FormatacaoMoedaPtBR.monetario(valor);
                        }
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
