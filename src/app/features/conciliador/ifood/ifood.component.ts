import {Component, OnInit} from '@angular/core';
import {ConciliadorIfoodService} from "../conciliador-ifood.service";
import {Empresa} from "../../../model/Empresa";
import {DataHelpers} from "../../../../helpers/DataHelpers";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {EmpresaService} from "../../empresa/empresa.service";
import {FiltroEmpresa} from "../../../filter/FiltroEmpresa";
import {Metodo} from "../../../model/Metodo";
import {Bandeira} from "../../../model/Bandeira";
import {Venda} from "../../../model/Venda";
import {IntegracaoService} from "../../configuracao/integracao/integracao.service";
import {FiltroConfiguracaoIntegracao} from "../../../filter/FiltroConfiguracaoIntegracao";
import {OperadoraService} from "../../operadora/operadora.service";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";

@Component({
  selector: 'app-ifood',
  templateUrl: './ifood.component.html',
  styleUrls: ['./ifood.component.css']
})
export class IfoodComponent implements OnInit {

    vendas = new Array<Venda>();

    empresas = new Array<Empresa>();

    empresaId: number;
    operadoraId: number;
    codigoIntegracao: string;

    metodos = new Array<String>();
    bandeiras = new Array<String>();

    dtVendaDe = new Date();
    dtVendaAte = new Date();

    constructor(
        private empresaService: EmpresaService,
        private integracaoService: IntegracaoService,
        private operadoraService: OperadoraService,
        private conciliadorService: ConciliadorIfoodService) { }

    ngOnInit(): void {
        DataHelpers.remove30Dias(this.dtVendaDe);
        this.carregarMetodosPagamento();
        this.carregarBandeiras();
        this.carregarEmpresas();
    }

    formatarMoeda (valor: number) {
        return FormatacaoMoedaPtBR.formatar(valor);
    }

    async pesquisar () {
        await this.buscarCodigoIntegracao();
        await this.conciliadorService.buscarVendas(this.codigoIntegracao, this.dtVendaDe, this.dtVendaAte).then(vendas => {
            this.vendas = vendas;
        });
    }

    formatarValor (valor: number) {
        return FormatacaoMoedaPtBR.formatar(valor);
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

    private carregarMetodosPagamento () {
        for (const metodoKey in Metodo) {
            // @ts-ignore
            this.metodos.push(Metodo[`${metodoKey}`].toUpperCase());
        }
    }

    private carregarBandeiras () {
        for (const bandeiraKey in Bandeira) {
            // @ts-ignore
            this.bandeiras.push(Bandeira[`${bandeiraKey}`].toUpperCase());
        }
    }

    private carregarEmpresas () {
        this.empresaService.pesquisar(new FiltroEmpresa()).then(empresas => {
            this.empresas = empresas;
        });
    }
}
