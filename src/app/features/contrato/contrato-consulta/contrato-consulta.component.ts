import {Component, OnInit} from '@angular/core';
import {EmpresaService} from "../../empresa/empresa.service";
import {OperadoraService} from "../../operadora/operadora.service";
import {Empresa} from "../../../model/Empresa";
import {Operadora} from "../../../model/Operadora";
import {FiltroEmpresa} from "../../../model/FiltroEmpresa";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";
import {Contrato} from "../../../model/Contrato";
import {ContratoService} from "../contrato.service";
import {FiltroContrato} from "../../../filter/FiltroContrato";
import {StringHelper} from "../../../../helpers/StringHelper";
import {AlertaService} from "../../../shared/alerta/alerta.service";
import {ConfirmationService} from "primeng/api";
import {Taxa} from "../../../model/Taxa";
import {TaxaService} from "../../taxa/taxa.service";
import {SegurancaService} from "../../seguranca/seguranca.service";

@Component({
    selector: 'app-contrato-consulta',
    templateUrl: './contrato-consulta.component.html',
    styleUrls: ['./contrato-consulta.component.css']
})
export class ContratoConsultaComponent implements OnInit {

    empresas: Empresa[];
    taxas = new Array<Taxa>();
    operadoras = new Array<Operadora>();
    contratos = new Array<Contrato>();
    filtro = new FiltroContrato();
    visivel = false;

    constructor(private empresaService: EmpresaService,
                private operadoraService: OperadoraService,
                private contratoService: ContratoService,
                private alerta: AlertaService,
                public segurancaService: SegurancaService,
                private confirmationService: ConfirmationService,
                private taxaService: TaxaService) {
    }

    ngOnInit(): void {
        this.carregarEmpresas();
        this.carregarOperadoras();
        this.carregarContratos();
    }

    completarComZeroEsquerda(numeroContrato: string) {
        return StringHelper.preencherComZero(numeroContrato, 10, false);
    }

    confirmarExclusao(contrato: Contrato) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o contrato de número '${this.completarComZeroEsquerda(contrato.numero.toString())}' ?`,
            accept: () => {
                this.excluir(contrato.numero);
            }
        })
    }

    async detalharTaxas(contrato: Contrato) {
        await this.taxaService.buscarPorContrato(contrato).then(taxas => {
            this.taxas = taxas;
            this.visivel = true;
        });

        if (this.taxas.length === 0) {
            this.alerta.atencao("A consulta não retornou nenhum resultado.");
            this.taxas = [];
        }
    }

    async pesquisar() {
        await this.contratoService.pesquisar(this.filtro).then(contratos => {
            this.contratos = contratos
        });

        if (this.contratos.length === 0) {
            this.alerta.atencao("A consulta não retornou nenhum resultado.");
            this.contratos = [];
        }
    }

    ativarOuDesativar(contrato: Contrato) {
        if (contrato.ativo) {
            this.desativar(contrato);
        } else {
            this.ativar(contrato);
        }
    }

    private ativar(contrato: Contrato) {
        this.contratoService.ativar(contrato.numero).then(() => {
            this.alerta.sucesso("Contrato ativada com sucesso.");
            contrato.ativo = true;
        });
    }

    private desativar(contrato: Contrato) {
        this.contratoService.desativar(contrato.numero).then(() => {
            this.alerta.sucesso("Contrato desativada com sucesso.");
            contrato.ativo = false;
        });
    }

    private excluir(id: number) {
        this.contratoService.excluir(id).then(() => {
            this.carregarContratos();
            this.alerta.sucesso("Contrato excluído com sucesso.");
        });
    }

    private carregarContratos() {
        this.contratoService.pesquisar(this.filtro).then(contratos => {
            this.contratos = contratos
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

    private carregarOperadoras() {
        this.operadoraService.pesquisar(new FiltroOperadora()).then(operadoras => {
            this.operadoras = operadoras;
        });
    }
}
