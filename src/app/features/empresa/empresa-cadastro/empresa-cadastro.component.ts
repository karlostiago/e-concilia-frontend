import {Component, OnInit} from '@angular/core';
import {EmpresaService} from "../empresa.service";
import {Empresa} from "../../../model/Empresa";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
import {Estado} from "../../../model/Estado";
import {ActivatedRoute, Router} from "@angular/router";
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {NgForm} from "@angular/forms";

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
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private error: ErroHandlerService
    ) { }

    ngOnInit(): void {
        this.carregarEstados();

        const empresaId = this.activatedRoute.snapshot.params['id'];

        if (empresaId) {
            this.pesquisarPorId(empresaId);
        }
    }

    pesquisarPorId (id: number) {
        this.empresaService.pesquisarPorId(id).then(response => {
            this.empresa = response;
        })
        .catch(error => {
            this.error.capturar(error);
        });
    }

    carregarEstados () {
        this.empresaService.todosEstados().then(response => {
            this.estados = response;
        });
    }

    async salvarOuEditar (form: NgForm) {
        if (this.empresa.id) {
            await this.editar();
        } else {
            await this.salvar(form);
        }
    }

    async salvar (form: NgForm) {
        this.empresaService.salvar(this.empresa)
            .then(resposta => {
                this.notificacao.sucesso("Empresa cadastrada com sucesso.");
                this.empresa = new Empresa();
                form.resetForm();
            })
            .catch(error => {
                this.error.capturar(error);
            });
    }

    async editar () {
        this.empresaService.editar(this.empresa)
            .then(resposta => {
                this.notificacao.sucesso("Empresa atualizada com sucesso.");
            })
            .catch(error => {
                this.error.capturar(error);
            });
    }

    async buscarDadosCnpj (cnpj: string) {
        if (cnpj) {
            const cnpjSemFormatacao = cnpj.replace(/[^0-9]/g, "");

            if (cnpjSemFormatacao.length === 14) {
                this.empresaService.buscarDadosCnpj(cnpjSemFormatacao)
                    .then(response => {
                        this.empresa = response;
                    })
                    .catch(error => {
                        this.error.capturar(error);
                    })
            }
        }
    }
}
