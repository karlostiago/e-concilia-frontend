import {Component, OnInit} from '@angular/core';
import {EmpresaService} from "../../empresa/empresa.service";
import {OperadoraService} from "../../operadora/operadora.service";
import {Empresa} from "../../../model/Empresa";
import {Operadora} from "../../../model/Operadora";
import {FiltroEmpresa} from "../../../model/FiltroEmpresa";
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";
import {Contrato} from "../../../model/Contrato";
import {Endereco} from "../../../model/Endereco";
import {Contato} from "../../../model/Contato";
import {Taxa} from "../../../model/Taxa";

@Component({
  selector: 'app-contrato-consulta',
  templateUrl: './contrato-consulta.component.html',
  styleUrls: ['./contrato-consulta.component.css']
})
export class ContratoConsultaComponent implements OnInit {

    empresas: Empresa[];
    operadoras = new Array<Operadora>();
    contratos = new Array<Contrato>();

    constructor(private empresaService: EmpresaService,
                private operadoraService: OperadoraService,
                private error: ErroHandlerService) { }

    ngOnInit(): void {
        this.carregarEmpresas();
        this.carregarOperadoras();

        const empresa = {
            id: 1,
            razaoSocial: 'RAZÃO SOCIAL TESTE',
            nomeFantasia: 'NOME FANTASIA LTDA',
            cnpj: '000000000000',
            endereco:  new Endereco(),
            contato: new Contato(),
            ativo: true,
        }

        const operadora = {
            id: 1,
            descricao:  'IFOOD',
            taxas: new Array<Taxa>(),
            ativo: true,
        }

        this.contratos = [
            { empresa: empresa, operadora: operadora, ativo: true }
        ]
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
