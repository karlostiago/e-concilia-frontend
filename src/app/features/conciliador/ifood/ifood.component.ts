import {Component, OnInit} from '@angular/core';
import {Conciliador} from "../../../model/Conciliador";
import {ConciliadorService} from "../conciliador.service";
import {Empresa} from "../../../model/Empresa";
import {DataHelpers} from "../../../../helpers/DateHelpers";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";

@Component({
  selector: 'app-ifood',
  templateUrl: './ifood.component.html',
  styleUrls: ['./ifood.component.css']
})
export class IfoodComponent implements OnInit {

    dataVenda: string;
    empresa = new Empresa();
    vendas = new Array<Conciliador>();

    constructor(private conciliadorService: ConciliadorService) { }

    ngOnInit(): void {
         this.buscarVendas();
    }

    formatarMoeda (valor: number) {
        return FormatacaoMoedaPtBR.formatar(valor);
    }

    private buscarVendas() {
        return this.conciliadorService.buscarVendas().then(vendas => {
            this.dataVenda = DataHelpers.formatPtBr(vendas[0].dataVenda);
            this.empresa = vendas[0].empresa;
            this.vendas = vendas;
        });
    }
}
