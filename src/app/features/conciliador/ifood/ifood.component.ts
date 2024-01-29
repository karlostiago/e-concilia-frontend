import {Component, OnInit, ViewChild} from '@angular/core';
import {ConciliadorIfoodService} from "../conciliador-ifood.service";
import {Empresa} from "../../../model/Empresa";
import {DataHelpers} from "../../../../helpers/DataHelpers";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {Metodo} from "../../../model/Metodo";
import {Bandeira} from "../../../model/Bandeira";
import {Venda} from "../../../model/Venda";
import {IntegracaoService} from "../../configuracao/integracao/integracao.service";
import {FiltroConfiguracaoIntegracao} from "../../../filter/FiltroConfiguracaoIntegracao";
import {OperadoraService} from "../../operadora/operadora.service";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
import {Table} from "primeng/table";
import {Conciliador} from "../../../model/Conciliador";
import {TipoRecebimento} from "../../../model/TipoRecebimento";
import {SegurancaService} from "../../seguranca/seguranca.service";
import {EmpresaService} from "../../empresa/empresa.service";
import {FiltroEmpresa} from "../../../model/FiltroEmpresa";

@Component({
    selector: 'app-ifood',
    templateUrl: './ifood.component.html',
    styleUrls: ['./ifood.component.css']
})
export class IfoodComponent implements OnInit {

    conciliador = new Conciliador();
    empresas = new Array<Empresa>();

    empresaId: number;
    operadoraId: number;
    codigoIntegracao: string;
    metodoPagamento: string;
    bandeira: string;
    tipoRecebimento: string;

    metodos = new Array<String>();
    bandeiras = new Array<String>();
    tiposRecebimento = new Array<String>();

    dtVendaDe = new Date();
    dtVendaAte = new Date();

    visivel: boolean;

    taxas: any;

    @ViewChild('tabela') tabela: Table;

    constructor(
        private integracaoService: IntegracaoService,
        private operadoraService: OperadoraService,
        private notificacao: NotificacaoService,
        public segurancaService: SegurancaService,
        private empresaService: EmpresaService,
        private conciliadorService: ConciliadorIfoodService) {
    }

    ngOnInit(): void {
        DataHelpers.remove30Dias(this.dtVendaDe);
        this.carregarMetodosPagamento();
        this.carregarBandeiras();
        this.carregarEmpresas();
        this.carregarTipoRecebimento();
    }

    async pesquisar() {
        if (this.empresaId === undefined || this.empresaId === -1) {
            this.notificacao.error("Nenhuma empresa foi selecionada.")
            return;
        }

        await this.buscarCodigoIntegracao();
        await this.conciliadorService.buscarVendas(this.codigoIntegracao, this.dtVendaDe, this.dtVendaAte, this.metodoPagamento, this.bandeira, this.tipoRecebimento).then(conciliador => {
            this.conciliador = conciliador;
            this.tabela.reset();
        });
    }

    limpar() {
        this.dtVendaDe = new Date();
        this.dtVendaAte = new Date();
        DataHelpers.remove30Dias(this.dtVendaDe);
        this.empresaId = -1;
        this.metodoPagamento = "";
        this.bandeira = "";
        this.tipoRecebimento = "";
    }

    formatarValor(valor: number) {
        return FormatacaoMoedaPtBR.monetario(valor);
    }

    dialogTaxaContratual(venda?: Venda) {
        this.visivel = !this.visivel;
        this.taxas = [];

        if (this.visivel) {
            this.taxas = [
                {
                    'comissao': venda?.cobranca.comissao,
                    'pagamento': venda?.cobranca.taxaAdquirente,
                    'servico': venda?.cobranca.taxaServico,
                    'incentivoPromocional': venda?.cobranca.beneficioComercio,
                    'taxaEntrega': venda?.cobranca.taxaEntrega
                }
            ]
        }
    }

    private async buscarCodigoIntegracao() {
        await this.buscarOperadora();

        const filtro = new FiltroConfiguracaoIntegracao();

        // @ts-ignore
        filtro.empresaId = this.empresaId;

        // @ts-ignore
        filtro.operadoraId = this.operadoraId;

        await this.integracaoService.pesquisar(filtro).then(integracoes => {
            this.codigoIntegracao = integracoes[0].codigoIntegracao;
        });
    }

    private async buscarOperadora() {
        const filtro = new FiltroOperadora();
        filtro.descricao = "ifood";

        await this.operadoraService.pesquisar(filtro).then(operadoras => {
            this.operadoraId = operadoras[0].id;
        });
    }

    private carregarMetodosPagamento() {
        for (const metodoKey in Metodo) {
            // @ts-ignore
            this.metodos.push(Metodo[`${metodoKey}`].toUpperCase());
        }
    }

    private carregarBandeiras() {
        for (const bandeiraKey in Bandeira) {
            // @ts-ignore
            this.bandeiras.push(Bandeira[`${bandeiraKey}`].toUpperCase());
        }
    }

    private carregarTipoRecebimento() {
        for (const tipoKey in TipoRecebimento) {
            // @ts-ignore
            this.tiposRecebimento.push(TipoRecebimento[`${tipoKey}`].toUpperCase());
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

    protected readonly Math = Math;
    protected readonly Venda = Venda;
}
