import {Component, OnInit} from '@angular/core';
import {Operadora} from "../../../model/Operadora";
import {AlertaService} from "../../../shared/alerta/alerta.service";
import {OperadoraService} from "../operadora.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SegurancaService} from "../../seguranca/seguranca.service";

@Component({
    selector: 'app-operadora-cadastro',
    templateUrl: './operadora-cadastro.component.html',
    styleUrls: ['./operadora-cadastro.component.css']
})
export class OperadoraCadastroComponent implements OnInit {

    operadora = new Operadora();

    constructor(
        private alerta: AlertaService,
        private operadoraService: OperadoraService,
        private router: Router,
        public segurancaService: SegurancaService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        const operadoraId = this.activatedRoute.snapshot.params['id'];

        if (operadoraId) {
            this.pesquisarPorId(operadoraId);
        }
    }

    pesquisarPorId(id: number) {
        this.operadoraService.pesquisarPorId(id).then(response => {
            this.operadora = response;
        });
    }

    async salvarOuEditar(form: NgForm) {
        if (this.operadora.id) {
            await this.editar();
        } else {
            this.salvar(form);
        }
    }

    salvar(ngForm: NgForm) {
        this.operadoraService.salvar(this.operadora).then(operadora => {
            this.alerta.sucesso("Operadora cadastrada com sucesso.");
            this.operadora = new Operadora();
            ngForm.resetForm();
        });
    }

    async editar() {
        this.operadoraService.editar(this.operadora).then(resposta => {
            this.alerta.sucesso("Operadora atualizada com sucesso.");
        });
    }

    voltar() {
        return this.router.navigate(["/consulta/operadoras"])
    }
}
