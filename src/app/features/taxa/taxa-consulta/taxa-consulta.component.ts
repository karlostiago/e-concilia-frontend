import {Component, OnInit} from '@angular/core';
import {Operadora} from "../../../model/Operadora";
import {Taxa} from "../../../model/Taxa";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {OperadoraService} from "../../operadora/operadora.service";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";
import {TaxaService} from "../taxa.service";
import {AlertaService} from "../../../shared/alerta/alerta.service";
import {SegurancaService} from "../../seguranca/seguranca.service";

@Component({
    selector: 'app-taxa-consulta',
    templateUrl: './taxa-consulta.component.html',
    styleUrls: ['./taxa-consulta.component.css']
})
export class TaxaConsultaComponent implements OnInit {

    operadoras = new Array<Operadora>();
    taxas = new Array<Taxa>();

    constructor(private operadoraService: OperadoraService,
                private taxaService: TaxaService,
                public segurancaService: SegurancaService,
                private alerta: AlertaService) {
    }

    ngOnInit(): void {
        this.operadoraService.pesquisar(new FiltroOperadora()).then(operadoras => {
            this.operadoras = operadoras;
        });

        this.taxaService.buscarTodos().then(taxas => {
            this.taxas = taxas;
        });
    }

    async buscar(event: any) {
        const operadora = this.selecionarOperadora(event.value);
        await this.taxaService.buscarPorOperadora(operadora).then(taxas => {
            this.taxas = taxas;
        });

        if (this.taxas.length === 0) {
            this.alerta.atencao("A consulta não retornou nenhum resultado.");
            this.taxas = [];
        }
    }

    formatarMoeda(valor: number, tipo: string) {
        if (tipo === 'PERCENTUAL') {
            return FormatacaoMoedaPtBR.percentual(valor);
        } else {
            return FormatacaoMoedaPtBR.monetario(valor);
        }
    }

    ativarOuDesativar(taxa: Taxa) {
        if (taxa.ativo) {
            this.desativar(taxa);
        } else {
            this.ativar(taxa);
        }
    }

    private ativar(taxa: Taxa) {
        this.taxaService.ativar(taxa.id).then(() => {
            this.alerta.sucesso("Taxa ativada com sucesso.");
            taxa.ativo = true;
        });
    }

    private desativar(taxa: Taxa) {
        this.taxaService.desativar(taxa.id).then(() => {
            this.alerta.sucesso("Taxa desativada com sucesso.");
            taxa.ativo = false;
        });
    }

    private selecionarOperadora(operadoraId: number) {
        return this.operadoras.filter(operadora => operadora.id === operadoraId)[0];
    }
}
