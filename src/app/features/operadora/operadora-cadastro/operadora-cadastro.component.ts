import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-operadora-cadastro',
  templateUrl: './operadora-cadastro.component.html',
  styleUrls: ['./operadora-cadastro.component.css']
})
export class OperadoraCadastroComponent implements OnInit {

    taxas: any;

    visivel: boolean;

    constructor() {
        // environment.apiUrl
    }

    ngOnInit(): void {
        this.taxas = [
            { descricao: "Taxa de entrega pela operadora", valor: 'R$ 1,50', ativo: true },
            { descricao: "Taxa de entrega pela loja", valor: 'R$ 2,50', ativo: true },
            { descricao: "Taxa de maquineta pela operadora", valor: 'R$ 2,80', ativo: true },
            { descricao: "Taxa de maquineta pela loja", valor: 'R$ 1,75', ativo: true }
        ]
    }

    abrirCadastroNovaTaxa () {
        this.visivel = true;
    }
}
