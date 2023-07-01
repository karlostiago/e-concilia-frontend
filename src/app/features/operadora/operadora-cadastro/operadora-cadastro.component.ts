import {Component, OnInit} from '@angular/core';
import {Taxa} from "../../../model/Taxa";
import {Operadora} from "../../../model/Operadora";

@Component({
  selector: 'app-operadora-cadastro',
  templateUrl: './operadora-cadastro.component.html',
  styleUrls: ['./operadora-cadastro.component.css']
})
export class OperadoraCadastroComponent implements OnInit {

    operadora = new Operadora();
    taxa = new Taxa();
    visivel: boolean;

    constructor() {
        // environment.apiUrl
    }

    ngOnInit(): void {

    }
    abrirModalCadastroNovaTaxa () {
        this.visivel = true;
    }
    salvarTaxa (taxa: Taxa) {
        taxa.ativo = this.operadora.ativo;
        taxa.expiraEm = -1;
        this.operadora.taxas.push(taxa);
        this.taxa = new Taxa();
        this.visivel = false;
    }
}
