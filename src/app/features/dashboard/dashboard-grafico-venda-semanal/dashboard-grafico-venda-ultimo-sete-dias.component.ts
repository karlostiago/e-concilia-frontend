import {Component, OnInit} from '@angular/core';
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {GraficoVendaUltimo7Dia} from "../../../model/GraficoVendaUltimo7Dia";

@Component({
    selector: 'app-dashboard-grafico-venda-ultimo-sete-dias',
    templateUrl: './dashboard-grafico-venda-ultimo-sete-dias.component.html',
    styleUrls: ['./dashboard-grafico-venda-ultimo-sete-dias.component.css']
})
export class DashboardGraficoVendaUltimoSeteDiasComponent implements OnInit {

    data: any;
    options: any;
    graficoVendaUltimo7Dia = new GraficoVendaUltimo7Dia();

    ngOnInit(): void {

    }

    atualizar(grafico: GraficoVendaUltimo7Dia) {
        this.graficoVendaUltimo7Dia = grafico;
        this.getData();
        this.getOptions();
    }

    private getData() {
        const documentStyle = getComputedStyle(document.documentElement);
        this.data = {
            labels: this.graficoVendaUltimo7Dia?.labels,
            datasets: [
                {
                    label: 'Vendas semanal',
                    data: this.graficoVendaUltimo7Dia?.data,
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--gray-500'), documentStyle.getPropertyValue('--teal-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--gray-400'), documentStyle.getPropertyValue('--teal-400')],
                    borderWidth: 0,
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
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Vendas semanal',
                    fontSize: 10,
                    color: textColor
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        display: true,
                        color: textColorSecondary,
                        callback: function (valor: number) {
                            return FormatacaoMoedaPtBR.monetario(valor);
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
    }
}
