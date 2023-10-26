import {Component, OnInit} from '@angular/core';
import {Venda} from "../../../model/Venda";
import {DashboardService} from "../dashboard.service";
import {Dashboard} from "../../../model/Dashboard";
import {EmpresaService} from "../../empresa/empresa.service";
import {Empresa} from "../../../model/Empresa";
import {FiltroEmpresa} from "../../../filter/FiltroEmpresa";
import {FiltroDashboard} from "../../../filter/FiltroDashboard";
import {DataHelpers} from "../../../../helpers/DataHelpers";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {GraficoVendaUltimo7Dia} from "../../../model/GraficoVendaUltimo7Dia";

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
    graficoVendaUltimo7Dia = new GraficoVendaUltimo7Dia();

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
