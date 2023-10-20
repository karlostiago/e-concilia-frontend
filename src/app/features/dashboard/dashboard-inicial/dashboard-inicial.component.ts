import {Component, OnInit} from '@angular/core';
import {Venda} from "../../../model/Venda";
import {DashboardService} from "../dashboard.service";
import {Dashboard} from "../../../model/Dashboard";
import {EmpresaService} from "../../empresa/empresa.service";
import {Empresa} from "../../../model/Empresa";
import {FiltroEmpresa} from "../../../filter/FiltroEmpresa";
import {FiltroDashboard} from "../../../filter/FiltroDashboard";
import {DataHelpers} from "../../../../helpers/DataHelpers";

@Component({
  selector: 'app-dashboard-inicial',
  templateUrl: './dashboard-inicial.component.html',
  styleUrls: ['./dashboard-inicial.component.css']
})
export class DashboardInicialComponent implements OnInit {

    filtro = new FiltroDashboard();
    dashboard = new Dashboard();
    empresas = new Array<Empresa>();
    empresaSelecionadaId = -1;

    basicData: any;
    basicOptions: any;

    constructor(private dashboardService: DashboardService,
                private empresaService: EmpresaService,) {
    }

    ngOnInit(): void {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.basicData = {
            labels: ['12/10', '13/10', '14/10', '15/10', '16/10', '17/10', '18/10'],
            datasets: [
                {
                    label: 'Vendas',
                    data: [540.20, 325.99, 702.58, 620.32, 835.25, 1100.99, 225.18],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1,
                }
            ]
        };

        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        this.pesquisar();
        this.carregarEmpresas();
    }

    pesquisar() {
        this.dashboardService.buscarInformacoes(this.empresaSelecionadaId, this.filtro.dtInicial, this.filtro.dtInicial).then(dashabord => {
            this.dashboard = dashabord;
        });
    }

    private carregarEmpresas () {
        this.empresaService.pesquisar(new FiltroEmpresa()).then(empresas => {
            this.empresas = empresas;
        });
    }
}
