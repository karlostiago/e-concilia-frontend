import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../../../model/Empresa";
import {Operadora} from "../../../../model/Operadora";
import {Integracao} from "../../../../model/Integracao";
import {FiltroEmpresa} from "../../../../filter/FiltroEmpresa";
import {FiltroOperadora} from "../../../../filter/FiltroOperadora";
import {EmpresaService} from "../../../empresa/empresa.service";
import {OperadoraService} from "../../../operadora/operadora.service";
import {NgForm} from "@angular/forms";
import {NotificacaoService} from "../../../../shared/notificacao/notificacao.service";
import {ActivatedRoute} from "@angular/router";
import {IntegracaoService} from "../integracao.service";
import {SegurancaService} from "../../../seguranca/seguranca.service";

@Component({
  selector: 'app-integracao-cadastro',
  templateUrl: './integracao-cadastro.component.html',
  styleUrls: ['./integracao-cadastro.component.css']
})
export class IntegracaoCadastroComponent implements OnInit {

    integracao = new Integracao();
    empresas = new Array<Empresa>();
    operadoras = new Array<Operadora>();

    empresaId: number;
    operadoraId: number;

    constructor(private empresaService: EmpresaService,
                private operadoraService: OperadoraService,
                private integracaoService: IntegracaoService,
                private activatedRoute: ActivatedRoute,
                public segurancaService: SegurancaService,
                private notificacao: NotificacaoService) { }

    ngOnInit(): void {
        this.carregarEmpresas();
        this.carregarOperadoras();

        const integracaoId = this.activatedRoute.snapshot.params['id'];

        if (integracaoId) {
            this.pesquisarPorId(integracaoId);
        }
    }

    pesquisarPorId (id: number) {
        this.integracaoService.pesquisarPorId(id).then(integracao => {
            this.integracao = integracao;
            this.empresaId = integracao.empresa.id;
            this.operadoraId = integracao.operadora.id;
        });
    }

    salvarOuEditar (form: NgForm) {
        this.selecionarEmpresa();
        this.selecionarOperadora();

        if (this.integracao.id) {
            this.editar();
        } else {
            this.salvar(form);
        }
    }

    private editar () {
        this.integracaoService.editar(this.integracao).then(() => {
            this.notificacao.sucesso("Integração atualizada com sucesso.");
        });
    }

    private salvar(form: NgForm) {
        this.integracaoService.salvar(this.integracao).then(integracao => {
            this.notificacao.sucesso("Integração realizada com sucesso.");
            this.integracao = new Integracao();
            form.resetForm();
        });
    }

    private selecionarOperadora () {
        const operadoras = this.operadoras.filter(operadora => operadora.id === this.operadoraId);
        if (operadoras.length === 1) {
            this.integracao.operadora = operadoras[0];
        }
    }

    private selecionarEmpresa () {
        const empresas = this.empresas.filter(empresa => empresa.id === this.empresaId);
        if (empresas.length === 1) {
            this.integracao.empresa = empresas[0];
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
