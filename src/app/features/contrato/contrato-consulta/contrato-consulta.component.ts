import {Component, OnInit} from '@angular/core';
import {EmpresaService} from "../../empresa/empresa.service";
import {OperadoraService} from "../../operadora/operadora.service";
import {Empresa} from "../../../model/Empresa";
import {Operadora} from "../../../model/Operadora";
import {FiltroEmpresa} from "../../../model/FiltroEmpresa";
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";

@Component({
  selector: 'app-contrato-consulta',
  templateUrl: './contrato-consulta.component.html',
  styleUrls: ['./contrato-consulta.component.css']
})
export class ContratoConsultaComponent implements OnInit {

    empresas: Empresa[];
    operadoras = new Array<Operadora>();

    constructor(private empresaService: EmpresaService,
                private operadoraService: OperadoraService,
                private error: ErroHandlerService) { }

    ngOnInit(): void {
        this.carregarEmpresas();
        this.carregarOperadoras();
    }

    private carregarEmpresas () {
        this.empresaService.pesquisar(new FiltroEmpresa()).then(empresas => {
            this.empresas = empresas;
        })
        .catch(error => {
            this.error.capturar(error);
        });
    }

    private carregarOperadoras () {
        this.operadoraService.pesquisar(new FiltroOperadora()).then(operadoras => {
            this.operadoras = operadoras;
        })
        .catch(error => {
            this.error.capturar(error);
        });
    }
}
