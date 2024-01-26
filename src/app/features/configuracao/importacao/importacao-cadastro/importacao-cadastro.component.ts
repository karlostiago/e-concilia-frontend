import {Component, OnInit} from '@angular/core';
import {Importacao} from "../../../../model/Importacao";
import {Operadora} from "../../../../model/Operadora";
import {OperadoraService} from "../../../operadora/operadora.service";
import {FiltroOperadora} from "../../../../filter/FiltroOperadora";
import {FiltroEmpresa} from "../../../../model/FiltroEmpresa";
import {EmpresaService} from "../../../empresa/empresa.service";
import {Empresa} from "../../../../model/Empresa";
import {ImportacaoService} from "../importacao.service";
import {NotificacaoService} from "../../../../shared/notificacao/notificacao.service";
import {NgForm} from "@angular/forms";
import {SegurancaService} from "../../../seguranca/seguranca.service";

@Component({
  selector: 'app-cadastro-importacao',
  templateUrl: './importacao-cadastro.component.html',
  styleUrls: ['./importacao-cadastro.component.css']
})
export class ImportacaoCadastroComponent implements OnInit {

    importacoes = new Array<Importacao>();
    importacao = new Importacao();
    operadoras = new Array<Operadora>();
    empresas = new Array<Empresa>();

    empresaId: number;
    operadoraId: number;

    constructor(private operadoraService: OperadoraService,
                private empresaService: EmpresaService,
                private importacaoService: ImportacaoService,
                private segurancaService: SegurancaService,
                private notificacao: NotificacaoService) {
    }

    ngOnInit(): void {
        this.carregarEmpresas();
        this.carregarOperadoras();
        this.carregarImportacoesAgendadas();
    }

    async agendar(form: NgForm) {
        this.selecionarEmpresa();
        this.selecionarOperadora();

        this.importacaoService.agendar(this.importacao).then(importacao => {
            this.notificacao.sucesso("Importação agendada com sucesso.");
            this.importacoes.push(importacao);
            this.limpar(form);
        });
    }

    limpar(form: NgForm) {
        form.resetForm();
        this.importacao = new Importacao();
        this.importacao.dataInicial = new Date();
        this.importacao.dataFinal = new Date();
    }

    carregarImportacoesAgendadas() {
        this.importacaoService.buscarPorAgendados().then(importacoes => {
            this.importacoes = importacoes;
        });
    }

    private selecionarOperadora () {
        const operadoras = this.operadoras.filter(operadora => operadora.id === this.operadoraId);
        if (operadoras.length === 1) {
            this.importacao.operadora = operadoras[0];
        }
    }

    private selecionarEmpresa () {
        const empresas = this.empresas.filter(empresa => empresa.id === this.empresaId);
        if (empresas.length === 1) {
            this.importacao.empresa = empresas[0];
        }
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

    private carregarOperadoras () {
        this.operadoraService.pesquisar(new FiltroOperadora()).then(operadoras => {
            this.operadoras = operadoras;
        });
    }
}
