import {Component, Input} from '@angular/core';
import {Taxa} from "../../../model/Taxa";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";

@Component({
    selector: 'app-contrato-taxas',
    templateUrl: './contrato-taxas.component.html',
    styleUrls: ['./contrato-taxas.component.css']
})
export class ContratoTaxasComponent {

    @Input() taxas = new Array<Taxa>();

    formatarMoeda(valor: number, tipo: string) {
        if (tipo === 'PERCENTUAL') {
            return FormatacaoMoedaPtBR.percentual(valor);
        } else {
            return FormatacaoMoedaPtBR.monetario(valor);
        }
    }
}
