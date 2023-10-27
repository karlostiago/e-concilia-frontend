import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {Dashboard} from "../../../model/Dashboard";
import {EmpresaService} from "../../empresa/empresa.service";
import {Empresa} from "../../../model/Empresa";
import {FiltroEmpresa} from "../../../filter/FiltroEmpresa";
import {FiltroDashboard} from "../../../filter/FiltroDashboard";
import {
    DashboardGraficoVendaUltimoSeteDiasComponent
} from "../dashboard-grafico-venda-ultimo-sete-dias/dashboard-grafico-venda-ultimo-sete-dias.component";

@Component({
  selector: 'app-dashboard-inicial',
  templateUrl: './dashboard-inicial.component.html',
  styleUrls: ['./dashboard-inicial.component.css']
})
export class DashboardInicialComponent implements OnInit {

    filtro = new FiltroDashboard();
    empresas = new Array<Empresa>();
    empresaSelecionadaId = -1;

    dashboard = new Dashboard();

    @ViewChild(DashboardGraficoVendaUltimoSeteDiasComponent) graficoVendaUltimoSeteDiasComponent: DashboardGraficoVendaUltimoSeteDiasComponent;

    constructor(private dashboardService: DashboardService,
                private empresaService: EmpresaService,) {
    }

    ngOnInit(): void {
        this.pesquisar();
        this.carregarEmpresas();
    }

    pesquisar() {
        this.dashboardService.buscarInformacoes(this.empresaSelecionadaId, this.filtro.dtInicial, this.filtro.dtFinal).then(dashabord => {
            this.dashboard = dashabord;
            this.graficoVendaUltimoSeteDiasComponent.atualizar(this.empresaSelecionadaId);
        });
    }

    limpar() {
        this.filtro = new FiltroDashboard();
        this.empresaSelecionadaId = -1;
    }

    private carregarEmpresas () {
        this.empresaService.pesquisar(new FiltroEmpresa()).then(empresas => {
            this.empresas = empresas;
        });
    }
}
