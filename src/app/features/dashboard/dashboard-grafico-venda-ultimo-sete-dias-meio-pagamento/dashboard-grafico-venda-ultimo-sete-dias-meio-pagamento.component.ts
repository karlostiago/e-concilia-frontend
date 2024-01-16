import {Component, OnInit} from '@angular/core';
import {GraficoVendaUltimo7DiaMeioPagamento} from "../../../model/GraficoVendaUltimo7DiaMeioPagamento";
import {DashboardService} from "../dashboard.service";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";

@Component({
  selector: 'app-dashboard-grafico-venda-ultimo-sete-dias-meio-pagamento',
  templateUrl: './dashboard-grafico-venda-ultimo-sete-dias-meio-pagamento.component.html',
  styleUrls: ['./dashboard-grafico-venda-ultimo-sete-dias-meio-pagamento.component.css']
})
export class DashboardGraficoVendaUltimoSeteDiasMeioPagamentoComponent implements OnInit {

    data: any;
    options: any;
    graficoVendaUltimo7DiasMeioPagamento = new GraficoVendaUltimo7DiaMeioPagamento();

    empresaInexistente = -1;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit(): void {
        this.atualizar(this.empresaInexistente);
    }

    atualizar(empresaId: number) {
        this.dashboardService.buscarVendasUltimos7DiasMeioPagamento(empresaId).then(data => {
            this.graficoVendaUltimo7DiasMeioPagamento = data;
            this.getData();
            this.getOptions();
        });
    }

    private getData() {
        this.data = {
            labels: this.graficoVendaUltimo7DiasMeioPagamento.labels,
            datasets: [
                {
                    label: 'Dinheiro',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgb(255, 159, 64)',
                    borderWidth: 1,
                    data: this.graficoVendaUltimo7DiasMeioPagamento.dataCash
                },
                {
                    label: 'Cartão crédito',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1,
                    data: this.graficoVendaUltimo7DiasMeioPagamento.dataCredit
                },
                {
                    label: 'Cartão dédito',
                    backgroundColor: 'rgba(200, 172, 235, 0.2)',
                    borderColor: 'rgb(200, 172, 235)',
                    borderWidth: 1,
                    data: this.graficoVendaUltimo7DiasMeioPagamento.dataDebit
                },
                {
                    label: 'Pix',
                    backgroundColor: 'rgba(139, 69, 19, 0.2)',
                    borderColor: 'rgb(139, 69, 19)',
                    borderWidth: 1,
                    data: this.graficoVendaUltimo7DiasMeioPagamento.dataPix
                },
                {
                    label: 'Outros',
                    backgroundColor: 'rgba(70, 130, 180, 0.2)',
                    borderColor: 'rgb(70, 130, 180)',
                    borderWidth: 1,
                    data: this.graficoVendaUltimo7DiasMeioPagamento.dataOther
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
                    formatter: function(valor: number) {
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
                    text: 'Vendas dos últimos 7 dias por meio de pagamentos',
                    fontSize: 10,
                    color: textColor
                }
            },
            scales: {
                x: {
                    stacked: false,
                    ticks: {
                        color: textColorSecondary,
                        callback: function(valor: number) {
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
