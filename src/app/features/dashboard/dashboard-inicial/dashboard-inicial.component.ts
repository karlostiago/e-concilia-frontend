import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {Dashboard} from "../../../model/Dashboard";
import {EmpresaService} from "../../empresa/empresa.service";
import {Empresa} from "../../../model/Empresa";
import {FiltroEmpresa} from "../../../filter/FiltroEmpresa";
import {FiltroDashboard} from "../../../filter/FiltroDashboard";
import {
    DashboardGraficoVendaUltimoSeteDiasComponent
} from "../dashboard-grafico-venda-semanal/dashboard-grafico-venda-ultimo-sete-dias.component";
import {SegurancaService} from "../../seguranca/seguranca.service";
import {
    DashboardGraficoVendaUltimoSeteDiasPercentualComponent
} from "../dashboard-grafico-venda-percentual/dashboard-grafico-venda-ultimo-sete-dias-percentual.component";
import {
    DashboardGraficoVendaMensalComponent
} from "../dashboard-grafico-venda-mensal/dashboard-grafico-venda-mensal.component";
import {
    DashboardGraficoVendaAnualComponent
} from "../dashboard-grafico-venda-anual/dashboard-grafico-venda-anual.component";

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
    @ViewChild(DashboardGraficoVendaUltimoSeteDiasPercentualComponent) graficoVendaUltimoSeteDiasPercentual: DashboardGraficoVendaUltimoSeteDiasPercentualComponent;
    @ViewChild(DashboardGraficoVendaMensalComponent) graficoVendaMensal: DashboardGraficoVendaMensalComponent;
    @ViewChild(DashboardGraficoVendaAnualComponent) graficoVendaAnual: DashboardGraficoVendaAnualComponent;

    constructor(private dashboardService: DashboardService,
                public segurancaService: SegurancaService,
                private empresaService: EmpresaService) {
    }

    ngOnInit(): void {
        this.carregarEmpresas();
    }

    pesquisar() {
        this.selecionarEmpresa();
        this.filtro.calcularPeriodo();

        this.dashboardService.buscarInformacoes(this.empresasSelecionadas.join(','), this.filtro.dtInicial, this.filtro.dtFinal).then(dashabord => {
            this.dashboard = dashabord;
            this.graficoVendaUltimoSeteDiasComponent.atualizar(dashabord.graficoDTO.graficoVendaUltimo7DiaDTO);
            this.graficoVendaUltimoSeteDiasPercentual.atualizar(dashabord.graficoDTO.graficoPercentualVendaFormaPagamentoDTO);
            this.graficoVendaMensal.atualizar(dashabord.graficoDTO.graficoVendaMensalDTO);
            this.graficoVendaAnual.atualizar(dashabord.graficoDTO.graficoVendaAnualDTO);
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
