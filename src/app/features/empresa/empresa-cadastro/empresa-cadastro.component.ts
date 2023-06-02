import {Component, OnInit} from '@angular/core';
import {EmpresaService} from "../empresa.service";
import {Empresa} from "../../../model/Empresa";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
import {Estado} from "../../../model/Estado";
import {Router} from "@angular/router";

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html',
  styleUrls: ['./empresa-cadastro.component.css']
})
export class EmpresaCadastroComponent implements OnInit {

    estados: Estado[];

    empresa = new Empresa();

    constructor(
        private empresaService: EmpresaService,
        private notificacao: NotificacaoService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.carregarEstados();
    }

    carregarEstados () {
        this.empresaService.todosEstados().then(response => {
            this.estados = response;
        });
    }

    salvar () {
        this.empresaService.salvar(this.empresa)
            .then(resposta => {
                this.notificacao.sucesso("Empresa cadastrada com sucesso.");
                this.empresa = new Empresa();
            })
            .catch(error => {
                this.notificacao.error(error);
            });
    }

    voltar () {
        this.router.navigate(["/empresas"]);
    }
}
