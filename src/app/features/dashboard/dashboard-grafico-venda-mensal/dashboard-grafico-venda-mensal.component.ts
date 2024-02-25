import {Component, Input, OnInit} from '@angular/core';
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {DashboardService} from "../dashboard.service";
import {GraficoVendaMensal} from "../../../model/GraficoVendaMensal";

@Component({
    selector: 'app-dashboard-grafico-venda-mensal',
    templateUrl: './dashboard-grafico-venda-mensal.component.html',
    styleUrls: ['./dashboard-grafico-venda-mensal.component.css']
})
export class DashboardGraficoVendaMensalComponent implements OnInit {

    data: any;
    options: any;
    graficoVendaMensal = new GraficoVendaMensal();

    @Input() empresas = new Array<string>();
    @Input() dataInicial: Date;
    @Input() dataFinal: Date;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() { }

    atualizar() {
        this.dashboardService.buscarVendaMensal(this.empresas.join(','), this.dataInicial, this.dataFinal).then(data => {
            this.graficoVendaMensal = data;
            this.getData();
            this.getOptions();
        });
    }

    private getData() {
        this.data = {
            labels: this.graficoVendaMensal.labels,
            datasets: this.getDataSets()
        };
    }

    private getOptions() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
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
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                        callback: function (valor: number) {
                            return FormatacaoMoedaPtBR.monetario(valor);
                        }
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }

    private getDataSets() {
        const objetos = [];

        for (const dataSet of this.graficoVendaMensal.dataSets) {
            const modelo = {
                label: dataSet.label,
                data: dataSet.data,
                fill: false,
                tension: 0.4
            }
            objetos.push(modelo);
        }

        return objetos;
    }
}
