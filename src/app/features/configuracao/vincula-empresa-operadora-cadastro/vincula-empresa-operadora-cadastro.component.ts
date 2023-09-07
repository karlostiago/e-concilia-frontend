import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../../model/Empresa";
import {Operadora} from "../../../model/Operadora";
import {VinculaEmpresaOperadora} from "../../../model/VinculaEmpresaOperadora";
import {FiltroEmpresa} from "../../../filter/FiltroEmpresa";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";
import {EmpresaService} from "../../empresa/empresa.service";
import {OperadoraService} from "../../operadora/operadora.service";
import {NgForm} from "@angular/forms";
import {Contrato} from "../../../model/Contrato";
import {ConfiguracaoService} from "../configuracao.service";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vincula-empresa-operadora-cadastro',
  templateUrl: './vincula-empresa-operadora-cadastro.component.html',
  styleUrls: ['./vincula-empresa-operadora-cadastro.component.css']
})
export class VinculaEmpresaOperadoraCadastroComponent implements OnInit {

    vinculaEmpresaOperadora = new VinculaEmpresaOperadora();
    empresas = new Array<Empresa>();
    operadoras = new Array<Operadora>();

    empresaId: number;
    operadoraId: number;

    constructor(private empresaService: EmpresaService,
                private operadoraService: OperadoraService,
                private configuracaoService: ConfiguracaoService,
                private activatedRoute: ActivatedRoute,
                private notificacao: NotificacaoService) { }

    ngOnInit(): void {
        this.carregarEmpresas();
        this.carregarOperadoras();

        const configuracaoId = this.activatedRoute.snapshot.params['id'];

        if (configuracaoId) {
            this.pesquisarPorId(configuracaoId);
        }
    }

    pesquisarPorId (id: number) {
        this.configuracaoService.pesquisarPorId(id).then(configuracao => {
            this.vinculaEmpresaOperadora = configuracao;
            this.empresaId = configuracao.empresa.id;
            this.operadoraId = configuracao.operadora.id;
        });
    }

    salvarOuEditar (form: NgForm) {
        this.selecionarEmpresa();
        this.selecionarOperadora();

        if (this.vinculaEmpresaOperadora.id) {
            this.editar();
        } else {
            this.salvar(form);
        }
    }

    private editar () {
        this.configuracaoService.editar(this.vinculaEmpresaOperadora).then(() => {
            this.notificacao.sucesso("Configuração atualizada com sucesso.");
        });
    }

    private salvar(form: NgForm) {
        this.configuracaoService.vincularEmpresaOperadora(this.vinculaEmpresaOperadora).then(vinculoEmpresaOperadora => {
            this.notificacao.sucesso("Configuração realizada com sucesso.");
            this.vinculaEmpresaOperadora = new VinculaEmpresaOperadora();
            form.resetForm();
        });
    }

    private selecionarOperadora () {
        const operadoras = this.operadoras.filter(operadora => operadora.id === this.operadoraId);
        if (operadoras.length === 1) {
            this.vinculaEmpresaOperadora.operadora = operadoras[0];
        }
    }

    private selecionarEmpresa () {
        const empresas = this.empresas.filter(empresa => empresa.id === this.empresaId);
        if (empresas.length === 1) {
            this.vinculaEmpresaOperadora.empresa = empresas[0];
        }
    }

    private carregarEmpresas () {
        this.empresaService.pesquisar(new FiltroEmpresa()).then(empresas => {
            this.empresas = empresas;
        });
    }

    private carregarOperadoras () {
        this.operadoraService.pesquisar(new FiltroOperadora()).then(operadoras => {
            this.operadoras = operadoras;
        });
    }
}
