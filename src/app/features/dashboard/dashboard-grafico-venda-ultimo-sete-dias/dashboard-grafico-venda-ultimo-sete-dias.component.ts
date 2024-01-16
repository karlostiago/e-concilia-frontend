import {Component, OnInit} from '@angular/core';
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {DashboardService} from "../dashboard.service";
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

    empresaInexistente = -1;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit(): void {
        this.atualizar(this.empresaInexistente);
    }

    atualizar(empresaId: number) {
        this.dashboardService.buscarVendasUltimos7Dias(empresaId).then(data => {
            this.graficoVendaUltimo7Dia = data;
            this.getData();
            this.getOptions();
        });
    }

    private getData() {
        this.data = {
            labels: this.graficoVendaUltimo7Dia.labels,
            datasets: [
                {
                    label: 'Vendas dos últimos 7 dias',
                    data: this.graficoVendaUltimo7Dia.data,
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1,
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
                    formatter: function(valor: number) {
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
                    text: 'Vendas dos últimos 7 dias',
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
                        callback: function(valor: number) {
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
