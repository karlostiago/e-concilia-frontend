import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-empresa-consulta',
  templateUrl: './empresa-consulta.component.html',
  styleUrls: ['./empresa-consulta.component.css']
})
export class EmpresaConsultaComponent implements OnInit {

    empresas = [
        { id: 1, "razao social": "Cometa Supermercados", "nome fantasia": "Cometa Supermercados Ltda", "cnpj": "57.115.221/0001-22", ativo: true },
        { id: 2, "razao social": "Mirelly Supermercados", "nome fantasia": "Mirelly Supermercados Ltda", "cnpj": "35.121.444/0001-60", ativo: true },
        { id: 3, "razao social": "Baratão Supermercados", "nome fantasia": "Baratão Supermercados Ltda", "cnpj": "50.493.967/0001-20", ativo: false },
    ]

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    novaEmpresa() {
        return this.router.navigate(["/cadastro/empresas/novo"]);
    }
}
