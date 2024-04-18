import {Component, OnInit} from '@angular/core';
import {FiltroRelatorio} from "../../../filter/FiltroRelatorio";

@Component({
  selector: 'app-relatorio-taxa',
  templateUrl: './relatorio-taxa.component.html',
  styleUrls: ['./relatorio-taxa.component.css']
})
export class RelatorioTaxaComponent implements OnInit {

    filtroRelatorio = new FiltroRelatorio();

    ngOnInit(): void {

    }

    gerar() {
        console.log("gerando relatorio de taxas", this.filtroRelatorio);
    }

}
