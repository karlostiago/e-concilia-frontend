import {Component, OnInit} from '@angular/core';
import {EmpresaService} from "../empresa.service";
import {Empresa} from "../../../model/Empresa";
import {AlertaService} from "../../../shared/alerta/alerta.service";
import {Estado} from "../../../model/Estado";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {SegurancaService} from "../../seguranca/seguranca.service";

@Component({
    selector: 'app-empresa-cadastro',
    templateUrl: './empresa-cadastro.component.html',
    styleUrls: ['./empresa-cadastro.component.css']
})
export class EmpresaCadastroComponent implements OnInit {

    estados: Estado[];

    empresa = new Empresa();

    constructor(
        public segurancaService: SegurancaService,
        private empresaService: EmpresaService,
        private alerta: AlertaService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.carregarEstados();

        const empresaId = this.activatedRoute.snapshot.params['id'];

        if (empresaId) {
            this.pesquisarPorId(empresaId);
        }
    }

    pesquisarPorId(id: number) {
        this.empresaService.pesquisarPorId(id).then(response => {
            this.empresa = response;
        });
    }

    carregarEstados() {
        this.empresaService.todosEstados().then(response => {
            this.estados = response;
        });
    }

    async salvarOuEditar(form: NgForm) {
        if (this.empresa.id) {
            await this.editar();
        } else {
            await this.salvar(form);
        }
    }

    async buscarDadosCnpj(cnpj: string) {
        if (cnpj) {
            const cnpjSemFormatacao = cnpj.replace(/[^0-9]/g, "");

            if (cnpjSemFormatacao.length === 14) {
                this.empresaService.buscarDadosCnpj(cnpjSemFormatacao)
                    .then(response => {
                        this.empresa = response;
                    });
            }
        }
    }

    private async salvar(form: NgForm) {
        this.empresaService.salvar(this.empresa)
            .then(resposta => {
                this.alerta.sucesso("Empresa cadastrada com sucesso.");
                this.empresa = new Empresa();
                form.resetForm();
            });
    }

    private async editar() {
        this.empresaService.editar(this.empresa)
            .then(resposta => {
                this.alerta.sucesso("Empresa atualizada com sucesso.");
            });
    }
}
