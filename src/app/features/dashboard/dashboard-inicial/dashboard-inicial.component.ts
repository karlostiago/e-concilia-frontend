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
import {
    DashboardGraficoVendaUltimoSeteDiasPercentualComponent
} from "../dashboard-grafico-venda-ultimo-sete-dias-percentual/dashboard-grafico-venda-ultimo-sete-dias-percentual.component";

@Component({
    selector: 'app-dashboard-inicial',
    templateUrl: './dashboard-inicial.component.html',
    styleUrls: ['./dashboard-inicial.component.css']
})
export class DashboardInicialComponent implements OnInit {

    filtro = new FiltroDashboard();
    empresas = new Array<Empresa>();
    empresaSelecionadaId = -1;
    empresasSelecionadas = new Array<string>();

    dashboard = new Dashboard();

    @ViewChild(DashboardGraficoVendaUltimoSeteDiasComponent) graficoVendaUltimoSeteDiasComponent: DashboardGraficoVendaUltimoSeteDiasComponent;
    @ViewChild(DashboardGraficoVendaUltimoSeteDiasCreditoDebitoComponent) graficoVendaUltimoSeteDiasCreditoDebito: DashboardGraficoVendaUltimoSeteDiasCreditoDebitoComponent;
    @ViewChild(DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent) graficoVendaUltimoSeteDiasDinheiroPix: DashboardGraficoVendaUltimoSeteDiasDinheiroPixComponent;
    @ViewChild(DashboardGraficoVendaUltimoSeteDiasPercentualComponent) graficoVendaUltimoSeteDiasPercentual: DashboardGraficoVendaUltimoSeteDiasPercentualComponent;

    constructor(private dashboardService: DashboardService,
                public segurancaService: SegurancaService,
                private empresaService: EmpresaService) {
    }

    ngOnInit(): void {
        this.carregarEmpresas();
    }

    pesquisar() {
        this.selecionarEmpresa();

        this.dashboardService.buscarInformacoes(this.empresasSelecionadas.join(','), this.filtro.dtInicial, this.filtro.dtFinal).then(dashabord => {
            this.dashboard = dashabord;
            this.graficoVendaUltimoSeteDiasComponent.atualizar(this.empresaSelecionadaId);
            this.graficoVendaUltimoSeteDiasCreditoDebito.atualizar(this.empresaSelecionadaId);
            this.graficoVendaUltimoSeteDiasDinheiroPix.atualizar(this.empresaSelecionadaId);
            this.graficoVendaUltimoSeteDiasPercentual.atualizar(this.empresaSelecionadaId);
        });
    }

    limpar() {
        this.filtro = new FiltroDashboard();
        this.empresaSelecionadaId = -1;
        this.carregarEmpresasPreSelecionadas();
    }

    private selecionarEmpresa() {
        if (this.empresaSelecionadaId && this.empresaSelecionadaId > 0) {
            this.empresasSelecionadas = []
            this.empresasSelecionadas.push(this.empresaSelecionadaId.toString());
        }
    }

    private carregarEmpresas() {
        const usuario = this.segurancaService.getUsuario();
        this.empresaService.pesquisar(new FiltroEmpresa()).then(lojas => {
            this.empresas = lojas;
            if (usuario !== null) {
                this.empresas = usuario.lojasPermitidas;
            }
            this.carregarEmpresasPreSelecionadas();
            this.pesquisar();
        });
    }

    private carregarEmpresasPreSelecionadas() {
        if (this.empresaSelecionadaId || this.empresaSelecionadaId === -1) {
            this.empresasSelecionadas = [];
            for (const empresa of this.empresas) {
                this.empresasSelecionadas.push(empresa.id.toString());
            }
        }
    }
}
