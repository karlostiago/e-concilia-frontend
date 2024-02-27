import {Component, OnInit, ViewChild} from '@angular/core';
import {FiltroConfiguracaoIntegracao} from "../../../../filter/FiltroConfiguracaoIntegracao";
import {Operadora} from "../../../../model/Operadora";
import {Empresa} from "../../../../model/Empresa";
import {Integracao} from "../../../../model/Integracao";
import {AlertaService} from "../../../../shared/alerta/alerta.service";
import {EmpresaService} from "../../../empresa/empresa.service";
import {OperadoraService} from "../../../operadora/operadora.service";
import {FiltroEmpresa} from "../../../../model/FiltroEmpresa";
import {FiltroOperadora} from "../../../../filter/FiltroOperadora";
import {ConfirmationService} from "primeng/api";
import {IntegracaoService} from "../integracao.service";
import {SegurancaService} from "../../../seguranca/seguranca.service";

@Component({
    selector: 'app-integracao-cadastro-consulta',
    templateUrl: './integracao-consulta.component.html',
    styleUrls: ['./integracao-consulta.component.css']
})
export class IntegracaoConsultaComponent implements OnInit {

    integracoes: Integracao[];

    filtro = new FiltroConfiguracaoIntegracao();
    operadoras = new Array<Operadora>();
    empresas = new Array<Empresa>();

    @ViewChild('tabela') tabela: any;

    constructor(private integracaoService: IntegracaoService,
                private empresaService: EmpresaService,
                private operadoraService: OperadoraService,
                public segurancaService: SegurancaService,
                private confirmationService: ConfirmationService,
                private alerta: AlertaService) {
    }

    ngOnInit(): void {
        this.carregarConfiguracoes();
        this.carregarEmpresas();
        this.carregarOperadoras();
    }

    confirmarExclusao(configuracao: Integracao) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir esta integração '${configuracao.codigoIntegracao}' ? Ao deletar não será mais possível acessar as suas conciliações!`,
            accept: () => {
                this.excluir(configuracao.id);
            }
        })
    }

    excluir(id: number) {
        this.integracaoService.excluir(id).then(() => {
            this.carregarConfiguracoes();
            this.alerta.sucesso("Configuração excluída com sucesso.");
        });
    }

    async pesquisar() {
        this.integracoes = [];

        await this.integracaoService.pesquisar(this.filtro).then(configuracoes => {
            this.integracoes = configuracoes;
        });

        if (this.integracoes.length === 0) {
            this.alerta.atencao("A consulta não retornou nenhum resultado.");
            this.integracoes = [];
        }
    }

    private carregarConfiguracoes() {
        this.integracaoService.pesquisar(this.filtro).then(configuracoes => {
            this.integracoes = configuracoes;
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
