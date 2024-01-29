import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {GraficoVendaUltimo7DiaDinheiroPix} from "../../../model/GraficoVendaUltimo7DiaDinheiroPix";

@Component({
    selector: 'app-dashboard-grafico-venda-ultimo-sete-dias-dinheiro-pix',
    templateUrl: './dashboard-grafico-venda-ultimo-sete-dias-dinheiro-pix.component.html',
    styleUrls: ['./dashboard-grafico-venda-ultimo-sete-dias-dinheiro-pix.component.css']
})
export class DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent implements OnInit {

    data: any;
    options: any;
    graficoVendaUltimo7DiaDinheiroPix = new GraficoVendaUltimo7DiaDinheiroPix();

    empresaInexistente = -1;

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit(): void {
        this.atualizar(this.empresaInexistente);
    }

    atualizar(empresaId: number) {
        this.dashboardService.buscarVendasUltimos7DiasDinheiroPix(empresaId).then(data => {
            this.graficoVendaUltimo7DiaDinheiroPix = data;
            this.getData();
            this.getOptions();
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

    private getOptions() {
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
                    text: 'Vendas dos últimos 7 dias em dinheiro e pix',
                    fontSize: 10,
                    color: textColor
                }
            },
            scales: {
                x: {
                    stacked: false,
                    ticks: {
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
