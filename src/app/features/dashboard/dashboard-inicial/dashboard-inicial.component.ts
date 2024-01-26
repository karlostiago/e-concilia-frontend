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
import {
    DashboardGraficoVendaUltimoSeteDiasCreditoDebitoComponent
} from "../dashboard-grafico-venda-ultimo-sete-dias-credito-debito/dashboard-grafico-venda-ultimo-sete-dias-credito-debito.component";
import {
    DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent
} from "../dashboard-grafico-venda-ultimo-sete-dias-dinheiro-pix/dashboard-grafico-venda-ultimo-sete-dias-dinheiro-pix.component";
import {SegurancaService} from "../../seguranca/seguranca.service";

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
    @ViewChild(DashboardGraficoVendaUltimoSeteDiasCreditoDebitoComponent) graficoVendaUltimoSeteDiasCreditoDebito: DashboardGraficoVendaUltimoSeteDiasCreditoDebitoComponent;
    @ViewChild(DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent) graficoVendaUltimoSeteDiasDinheiroPix: DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent;

    constructor(private dashboardService: DashboardService,
                private segurancaService: SegurancaService,
                private empresaService: EmpresaService) {
    }

    ngOnInit(): void {
        this.pesquisar();
        this.carregarEmpresas();
    }

    pesquisar() {
        this.dashboardService.buscarInformacoes(this.empresaSelecionadaId, this.filtro.dtInicial, this.filtro.dtFinal).then(dashabord => {
            this.dashboard = dashabord;
            this.graficoVendaUltimoSeteDiasComponent.atualizar(this.empresaSelecionadaId);
            this.graficoVendaUltimoSeteDiasCreditoDebito.atualizar(this.empresaSelecionadaId);
            this.graficoVendaUltimoSeteDiasDinheiroPix.atualizar(this.empresaSelecionadaId);
        });
    }

    limpar() {
        this.filtro = new FiltroDashboard();
        this.empresaSelecionadaId = -1;
    }

    private carregarEmpresas () {
        const usuario = this.segurancaService.getUsuario();
        this.empresaService.pesquisar(new FiltroEmpresa()).then(empresas => {
            this.empresas = empresas;
            if (usuario !== null) {
                this.empresas = usuario.lojasPermitidas;
            }
        });
    }
}
