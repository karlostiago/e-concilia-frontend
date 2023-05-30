import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contrato-cadastro',
  templateUrl: './contrato-cadastro.component.html',
  styleUrls: ['./contrato-cadastro.component.css']
})
export class ContratoCadastroComponent implements OnInit {

    empresas: any;

    operadoras: any;

    taxas: any;

    ngOnInit(): void {
        this.empresas = [
            { label: 'Cometa Supermercados Ltda', value: 0 },
            { label: 'Mirelly Supermercados Ltda', value: 1 },
            { label: 'Baratão Supermercados Ltda', value: 2 },
            { label: 'Pinheiro Supermercados Ltda', value: 3 }
        ];

        this.operadoras = [
            { label: 'Ifood', value: 0 },
            { label: 'Ubearts', value: 1 },
            { label: 'Glovo', value: 2 },
            { label: 'Rappi', value: 3 },
            { label: 'Grubhub', value: 4 },
            { label: 'DoorDash', value: 5 }
        ];

        this.taxas = [
            { descricao: "Taxa de entrega pela operadora", valor: 'R$ 1,50', ativo: true },
            { descricao: "Taxa de entrega pela loja", valor: 'R$ 2,50', ativo: true },
            { descricao: "Taxa de maquineta pela operadora", valor: 'R$ 2,80', ativo: true },
            { descricao: "Taxa de maquineta pela loja", valor: 'R$ 1,75', ativo: true }
        ]
    }
}
