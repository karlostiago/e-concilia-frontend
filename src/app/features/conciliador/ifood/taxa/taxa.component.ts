import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormatacaoMoedaPtBR} from "../../../../../helpers/FormatacaoMoedaPtBR";

@Component({
  selector: 'app-taxa',
  templateUrl: './taxa.component.html',
  styleUrls: ['./taxa.component.css']
})
export class TaxaComponent implements OnInit {

    @Input() visivel: boolean;

    @Input() taxas: any;

    @Output() fechar = new EventEmitter<void>();

    ngOnInit(): void {
    }

    formatarValor (valor: number) {
        return FormatacaoMoedaPtBR.monetario(valor);
    }

    fecharDialog() {
        this.fechar.emit();
    }
}
