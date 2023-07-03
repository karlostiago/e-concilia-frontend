import {Component, OnInit} from '@angular/core';
import {Operadora} from "../../../model/Operadora";
import {Taxa} from "../../../model/Taxa";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {OperadoraService} from "../../operadora/operadora.service";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";
import {ErroHandlerService} from "../../../core/ErroHandlerService";

@Component({
  selector: 'app-taxa-consulta',
  templateUrl: './taxa-consulta.component.html',
  styleUrls: ['./taxa-consulta.component.css']
})
export class TaxaConsultaComponent implements  OnInit {

    operadoras = new Array<Operadora>();
    taxas = new Array<Taxa>();

    constructor(private operadoraService: OperadoraService,
                private error: ErroHandlerService) { }

    ngOnInit(): void {
        this.operadoraService.pesquisar(new FiltroOperadora()).then(operadoras => {
           this.operadoras = operadoras;
        })
        .catch(error => {
            this.error.capturar(error);
        });
    }

    buscar (event: any) {
        const operadoraId = event.value;
        this.operadoraService.pesquisarPorId(operadoraId).then(operadora => {
            this.taxas = operadora.taxas;
        })
        .catch(error => {
            this.error.capturar(error);
        });
    }

    formatarMoeda (valor: number) {
        return FormatacaoMoedaPtBR.formatar(valor);
    }
}
