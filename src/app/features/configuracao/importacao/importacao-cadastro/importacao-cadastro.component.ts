import {Component, OnInit} from '@angular/core';
import {Importacao} from "../../../../model/Importacao";
import {Operadora} from "../../../../model/Operadora";
import {OperadoraService} from "../../../operadora/operadora.service";
import {FiltroOperadora} from "../../../../filter/FiltroOperadora";

@Component({
  selector: 'app-cadastro-importacao',
  templateUrl: './importacao-cadastro.component.html',
  styleUrls: ['./importacao-cadastro.component.css']
})
export class ImportacaoCadastroComponent implements OnInit {

    importacao = new Importacao();
    operadoras = new Array<Operadora>();

    constructor(private operadoraService: OperadoraService) {
    }

    ngOnInit(): void {
        this.carregarOperadoras();
    }

    private carregarOperadoras () {
        this.operadoraService.pesquisar(new FiltroOperadora()).then(operadoras => {
            this.operadoras = operadoras;
        });
    }
}
