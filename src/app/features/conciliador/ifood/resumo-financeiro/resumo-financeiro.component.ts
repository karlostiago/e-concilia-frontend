import {Component, Input} from '@angular/core';
import {ResumoFinanceiro} from "../../../../model/ResumoFinanceiro";
import {FormatacaoMoedaPtBR} from "../../../../../helpers/FormatacaoMoedaPtBR";

@Component({
    selector: 'app-resumo-financeiro',
    templateUrl: './resumo-financeiro.component.html',
    styleUrls: ['./resumo-financeiro.component.css']
})
export class ResumoFinanceiroComponent {

    @Input() resumoFinanceiro = new ResumoFinanceiro();

    formatarValor(valor: number) {
        return FormatacaoMoedaPtBR.monetario(valor);
    }
}
