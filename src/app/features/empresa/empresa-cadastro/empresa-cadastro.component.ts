import {Component, OnInit} from '@angular/core';
import {EmpresaService} from "../empresa.service";
import {NgForm} from "@angular/forms";
import {Empresa} from "../../../model/Empresa";

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html',
  styleUrls: ['./empresa-cadastro.component.css']
})
export class EmpresaCadastroComponent implements OnInit {

    estados: { label: string; value: number }[];

    empresa = new Empresa();

    constructor(private empresaService: EmpresaService) {

    }

    ngOnInit(): void {
        this.carregarEstados();
    }

    carregarEstados () {
        this.empresaService.todosEstados().then(response => {
            this.estados = response.map((estado: { uf: string, codigo: number }) => {
                return {
                    label: estado.uf,
                    value: estado.codigo
                }
            });
        });
    }

    salvar (form: NgForm) {
        console.log(this.empresa);
        form.resetForm();
    }
}
