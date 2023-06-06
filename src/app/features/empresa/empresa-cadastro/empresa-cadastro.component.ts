import {Component, OnInit} from '@angular/core';
import {EmpresaService} from "../empresa.service";
import {Empresa} from "../../../model/Empresa";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
import {Estado} from "../../../model/Estado";
import {Router} from "@angular/router";
import {ErroHandlerService} from "../../../core/ErroHandlerService";

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
        private erro: ErroHandlerService
    ) { }

    ngOnInit(): void {
        this.carregarEstados();
    }

    carregarEstados () {
        this.empresaService.todosEstados().then(response => {
            this.estados = response;
        });
    }

    async salvar () {
        this.empresaService.salvar(this.empresa)
            .then(resposta => {
                this.notificacao.sucesso("Empresa cadastrada com sucesso.");
                this.empresa = new Empresa();
            })
            .catch(error => {
                this.erro.capturar(error);
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
                        this.erro.capturar(error);
                    })
            }
        }
    }

    voltar () {
        return this.router.navigate(["/consulta/empresas"])
    }
}
