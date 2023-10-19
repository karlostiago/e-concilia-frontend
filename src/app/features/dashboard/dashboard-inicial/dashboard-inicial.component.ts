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

    private carregarEmpresas () {
        this.empresaService.pesquisar(new FiltroEmpresa()).then(empresas => {
            this.empresas = empresas;
        });
    }
}
