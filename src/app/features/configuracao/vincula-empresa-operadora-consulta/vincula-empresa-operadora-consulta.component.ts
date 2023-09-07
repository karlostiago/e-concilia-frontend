import {Component, OnInit, ViewChild} from '@angular/core';
import {FiltroConfiguracaoIntegracao} from "../../../filter/FiltroConfiguracaoIntegracao";
import {Operadora} from "../../../model/Operadora";
import {Empresa} from "../../../model/Empresa";
import {VinculaEmpresaOperadora} from "../../../model/VinculaEmpresaOperadora";
import {ConfiguracaoService} from "../configuracao.service";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
import {EmpresaService} from "../../empresa/empresa.service";
import {OperadoraService} from "../../operadora/operadora.service";
import {FiltroEmpresa} from "../../../model/FiltroEmpresa";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-vincula-empresa-operadora-cadastro-consulta',
  templateUrl: './vincula-empresa-operadora-consulta.component.html',
  styleUrls: ['./vincula-empresa-operadora-consulta.component.css']
})
export class VinculaEmpresaOperadoraConsultaComponent implements OnInit {

    configuracoes: VinculaEmpresaOperadora[];

    filtro = new FiltroConfiguracaoIntegracao();
    operadoras = new Array<Operadora>();
    empresas = new Array<Empresa>();

    @ViewChild('tabela') tabela: any;

    constructor(private configuracaoService: ConfiguracaoService,
                private empresaService: EmpresaService,
                private operadoraService: OperadoraService,
                private confirmationService: ConfirmationService,
                private notificacao: NotificacaoService) { }

    ngOnInit(): void {
        this.carregarConfiguracoes();
        this.carregarEmpresas();
        this.carregarOperadoras();
    }

    confirmarExclusao (configuracao: VinculaEmpresaOperadora) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a configuração '${ configuracao.codigoIntegracao }' ? Ao deletar está configuração não será mais possível acessar as suas conciliações!`,
            accept: () => {
                this.excluir(configuracao.id);
            }
        })
    }

    excluir (id: number) {
        this.configuracaoService.excluir(id).then(() => {
            this.carregarConfiguracoes();
            this.notificacao.sucesso("Configuração excluída com sucesso.");
        });
    }

    async pesquisar() {
        this.configuracoes = [];

        await this.configuracaoService.pesquisarConfiguracoesVinculoEmpresaOperadora(this.filtro).then(configuracoes => {
            this.configuracoes = configuracoes;
        });

        if (this.configuracoes.length === 0) {
            this.notificacao.atencao("A consulta não retornou nenhum resultado.");
            this.configuracoes = [];
        }
    }

    private carregarConfiguracoes () {
        this.configuracaoService.pesquisarConfiguracoesVinculoEmpresaOperadora(this.filtro).then(configuracoes => {
            this.configuracoes = configuracoes;
        });
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
