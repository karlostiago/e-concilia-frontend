import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../../model/Empresa";
import {Operadora} from "../../../model/Operadora";
import {Taxa} from "../../../model/Taxa";
import {EmpresaService} from "../../empresa/empresa.service";
import {OperadoraService} from "../../operadora/operadora.service";
import {FiltroEmpresa} from "../../../filter/FiltroEmpresa";
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {NgForm} from "@angular/forms";
import {Contrato} from "../../../model/Contrato";
import {ContratoService} from "../contrato.service";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";

@Component({
  selector: 'app-contrato-cadastro',
  templateUrl: './contrato-cadastro.component.html',
  styleUrls: ['./contrato-cadastro.component.css']
})
export class ContratoCadastroComponent implements OnInit {

    empresas = new Array<Empresa>();
    operadoras = new Array<Operadora>();
    taxas = new Array<Taxa>();
    contrato = new Contrato();

    empresaId: number;
    operadoraId: number;

    constructor(private empresaService: EmpresaService,
                private operadoraService: OperadoraService,
                private contratoService: ContratoService,
                private notificacao: NotificacaoService,
                private error: ErroHandlerService) { }


    ngOnInit(): void {
        this.carregarEmpresas();
        this.carregarOperadoras();
    }

    buscarTaxas (event: any) {
        const operadoraId = event.value;
        const  operadora = this.operadoras.filter(operadora => operadora.id === operadoraId)
        if (operadora.length === 1) {
            this.taxas = operadora[0].taxas;
        }
    }

    formatarMoeda (valor: number) {
        return FormatacaoMoedaPtBR.formatar(valor);
    }

    salvar(form: NgForm) {

        const empresas = this.empresas.filter(empresa => empresa.id === this.empresaId);
        if (empresas.length === 1) {
           this.contrato.empresa = empresas[0];
        }

        const operadoras = this.operadoras.filter(operadora => operadora.id === this.operadoraId);
        if (operadoras.length === 1) {
           this.contrato.operadora = operadoras[0];
        }

        this.contratoService.salvar(this.contrato).then(contrato => {
            this.notificacao.sucesso("Contrato cadastrado com sucesso.");
            this.contrato = new Contrato();
            this.taxas = new Array<Taxa>();
            form.resetForm();
        })
        .catch(error => {
            this.error.capturar(error);
        });
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
