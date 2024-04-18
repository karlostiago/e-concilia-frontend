import {Component, Input, OnInit, Output} from '@angular/core';
import {TipoRelatorio} from "../../../model/TipoRelatorio";
import {FiltroRelatorio} from "../../../filter/FiltroRelatorio";
import {EmpresaService} from "../../empresa/empresa.service";
import {OperadoraService} from "../../operadora/operadora.service";
import {FiltroEmpresa} from "../../../filter/FiltroEmpresa";
import {SegurancaService} from "../../seguranca/seguranca.service";
import {Empresa} from "../../../model/Empresa";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";
import {Operadora} from "../../../model/Operadora";

@Component({
  selector: 'app-relatorio-filtro',
  templateUrl: './relatorio-filtro.component.html',
  styleUrls: ['./relatorio-filtro.component.css']
})
export class RelatorioFiltroComponent implements OnInit {

    @Input() filtroRelatorio = new FiltroRelatorio();

    tiposRelatorio = new Array<String>();
    empresas = new Array<Empresa>();
    operadoras = new Array<Operadora>();

    constructor(private empresaService: EmpresaService,
                private operadoraService: OperadoraService,
                private segurancaService: SegurancaService) {
    }

    ngOnInit(): void {
        this.carregarTiposRelatorio();
        this.carregarEmpresas();
        this.carregarOperadoras();
    }

    private carregarOperadoras() {
        this.operadoraService.pesquisar(new FiltroOperadora()).then(operadoras => {
            this.operadoras = operadoras;
        });
    }

    private carregarEmpresas() {
        const usuario = this.segurancaService.getUsuario();
        this.empresaService.pesquisar(new FiltroEmpresa()).then(empresas => {
            this.empresas = empresas;
            if (usuario !== null) {
                this.empresas = usuario.lojasPermitidas;
            }
        });
    }

    private carregarTiposRelatorio() {
        for (const tipoRelatorioKey in TipoRelatorio) {
            // @ts-ignore
            this.tiposRelatorio.push(TipoRelatorio[`${tipoRelatorioKey}`].toUpperCase());
        }
    }
}
