import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../../model/Empresa";
import {Operadora} from "../../../model/Operadora";
import {Taxa} from "../../../model/Taxa";
import {EmpresaService} from "../../empresa/empresa.service";
import {OperadoraService} from "../../operadora/operadora.service";
import {FiltroEmpresa} from "../../../filter/FiltroEmpresa";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {NgForm} from "@angular/forms";
import {Contrato} from "../../../model/Contrato";
import {ContratoService} from "../contrato.service";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService} from "primeng/api";
import {TaxaService} from "../../taxa/taxa.service";
import {SegurancaService} from "../../seguranca/seguranca.service";

@Component({
    selector: 'app-contrato-cadastro',
    templateUrl: './contrato-cadastro.component.html',
    styleUrls: ['./contrato-cadastro.component.css']
})
export class ContratoCadastroComponent implements OnInit {

    contrato = new Contrato();
    empresas = new Array<Empresa>();
    operadoras = new Array<Operadora>();
    taxa = new Taxa();

    empresaId: number;
    operadoraId: number;

    visivel: boolean;

    constructor(private empresaService: EmpresaService,
                private operadoraService: OperadoraService,
                private contratoService: ContratoService,
                private notificacao: NotificacaoService,
                private activatedRoute: ActivatedRoute,
                private taxaService: TaxaService,
                public segurancaService: SegurancaService,
                private confirmationService: ConfirmationService) {
    }


    ngOnInit(): void {
        this.taxa.tipo = "PERCENTUAL";

        this.carregarEmpresas();
        this.carregarOperadoras();
        const contratoId = this.activatedRoute.snapshot.params['numero'];

        if (contratoId) {
            this.pesquisarPorId(contratoId);
        }
    }

    formatarTaxa(valor: number, tipo: string) {
        if (tipo === 'PERCENTUAL') {
            return FormatacaoMoedaPtBR.percentual(valor);
        } else {
            return FormatacaoMoedaPtBR.monetario(valor);
        }
    }

    salvarOuEditar(form: NgForm) {
        this.selecionarEmpresa();
        this.selecionarOperadora();

        if (this.contrato.numero) {
            this.editar();
        } else {
            this.salvar(form);
        }
    }

    dialogIncluirTaxa() {
        this.visivel = true;
    }

    temOperadoraSelecionada() {
        return !!this.operadoraId;
    }

    salvarTaxa(taxa: Taxa) {
        this.verificaDuplicidadeDeTaxa(taxa);
        this.taxaService.validarTaxa(taxa).then(response => {
            response.ativo = response.expiraEm > 0;
            this.contrato.taxas.push(response);
            this.taxa = new Taxa();
            this.visivel = false;
        });
    }

    confirmarExclusao(taxa: Taxa) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir '${taxa.descricao}' ?`,
            accept: () => {
                this.excluirTaxa(taxa);
            }
        });
    }

    cancelar() {
        this.visivel = false;
        this.taxa = new Taxa();
        this.taxa.tipo = 'PERCENTUAL';
    }

    private excluirTaxa(taxa: Taxa) {
        const index = this.contrato.taxas.indexOf(taxa);
        if (index > -1) {
            this.contrato.taxas.splice(index, 1);
        }
    }

    private pesquisarPorId(id: number) {
        this.contratoService.pesquisarPorId(id).then(contrato => {
            this.contrato = contrato;
            this.operadoraId = this.contrato.operadora.id;
            this.empresaId = this.contrato.empresa.id;
        });
    }

    private selecionarOperadora() {
        const operadoras = this.operadoras.filter(operadora => operadora.id === this.operadoraId);
        if (operadoras.length === 1) {
            this.contrato.operadora = operadoras[0];
        }
    }

    private selecionarEmpresa() {
        const empresas = this.empresas.filter(empresa => empresa.id === this.empresaId);
        if (empresas.length === 1) {
            this.contrato.empresa = empresas[0];
        }
    }

    private editar() {
        this.contratoService.editar(this.contrato).then(() => {
            this.notificacao.sucesso("Contrato atualizado com sucesso.");
        });
    }

    private salvar(form: NgForm) {
        this.contratoService.salvar(this.contrato).then(contrato => {
            this.notificacao.sucesso("Contrato cadastrado com sucesso.");
            this.contrato = new Contrato();
            form.resetForm();
        });
    }

    private verificaDuplicidadeDeTaxa(taxa: Taxa) {
        const taxaEncontrada = this.contrato.taxas.filter(tx => tx.descricao === taxa.descricao);
        if (taxaEncontrada.length > 0) {
            const mensagem = `Taxa ${taxa.descricao}, está duplicada na lista.`;
            this.notificacao.error(mensagem);
            throw new Error(mensagem);
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
