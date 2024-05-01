import {Component, OnDestroy, OnInit} from '@angular/core';
import {Importacao} from "../../../../model/Importacao";
import {Operadora} from "../../../../model/Operadora";
import {OperadoraService} from "../../../operadora/operadora.service";
import {FiltroOperadora} from "../../../../filter/FiltroOperadora";
import {FiltroEmpresa} from "../../../../filter/FiltroEmpresa";
import {EmpresaService} from "../../../empresa/empresa.service";
import {Empresa} from "../../../../model/Empresa";
import {ImportacaoService} from "../importacao.service";
import {AlertaService} from "../../../../shared/alerta/alerta.service";
import {NgForm} from "@angular/forms";
import {SegurancaService} from "../../../seguranca/seguranca.service";
import {LoaderService} from "../../../../core/loader/loader.service";

@Component({
    selector: 'app-cadastro-importacao',
    templateUrl: './importacao-cadastro.component.html',
    styleUrls: ['./importacao-cadastro.component.css']
})
export class ImportacaoCadastroComponent implements OnInit, OnDestroy {

    importacoes = new Array<Importacao>();
    importacao = new Importacao();
    operadoras = new Array<Operadora>();
    empresas = new Array<Empresa>();

    empresaId: number;
    operadoraId: number;

    private atualizacaoAutomatica: any;

    constructor(private operadoraService: OperadoraService,
                private empresaService: EmpresaService,
                private importacaoService: ImportacaoService,
                public segurancaService: SegurancaService,
                private alerta: AlertaService,
                private loaderService: LoaderService) {
    }

    ngOnInit(): void {
        this.carregarEmpresas();
        this.carregarOperadoras();
        this.executarAtualizacaoAutomatica();
    }

    ngOnDestroy(): void {
        this.loaderService.automatic = true;
        clearInterval(this.atualizacaoAutomatica);
    }

    agendar(form: NgForm) {
        this.loaderService.automatic = true;

        this.selecionarEmpresa();
        this.selecionarOperadora();

        this.importacaoService.agendar(this.importacao).then(() => {
            this.alerta.sucesso("Importação agendada com sucesso.");
            this.limpar(form);
        });

        clearInterval(this.atualizacaoAutomatica);
        this.executarAtualizacaoAutomatica();
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

    private executarAtualizacaoAutomatica() {
        this.loaderService.automatic = false;
        this.atualizacaoAutomatica = setInterval(() => this.carregarImportacoesAgendadas(), 1000);
    }

    private selecionarOperadora() {
        const operadoras = this.operadoras.filter(operadora => operadora.id === this.operadoraId);
        if (operadoras.length === 1) {
            this.importacao.operadora = operadoras[0];
        }
    }

    private selecionarEmpresa() {
        const empresas = this.empresas.filter(empresa => empresa.id === this.empresaId);
        if (empresas.length === 1) {
            this.importacao.empresa = empresas[0];
        }
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

    private carregarOperadoras() {
        this.operadoraService.pesquisar(new FiltroOperadora()).then(operadoras => {
            this.operadoras = operadoras;
        });
    }
}
