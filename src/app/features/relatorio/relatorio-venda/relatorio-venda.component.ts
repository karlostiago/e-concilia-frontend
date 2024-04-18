import {Component, OnInit} from '@angular/core';
import {FiltroRelatorio} from "../../../filter/FiltroRelatorio";

@Component({
  selector: 'app-relatorio-venda',
  templateUrl: './relatorio-venda.component.html',
  styleUrls: ['./relatorio-venda.component.css']
})
export class RelatorioVendaComponent implements OnInit {

    filtroRelatorio = new FiltroRelatorio();

    ngOnInit(): void {

    }

    gerar() {
        console.log("gerando relatorio de vendas", this.filtroRelatorio);
    }
}
