import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Empresa} from "../../../model/Empresa";
import {EmpresaService} from "../empresa.service";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {FiltroEmpresa} from "../../../filter/FiltroEmpresa";
import {ConfirmationService} from "primeng/api";

@Component({
    selector: 'app-empresa-consulta',
    templateUrl: './empresa-consulta.component.html',
    styleUrls: ['./empresa-consulta.component.css']
})
export class EmpresaConsultaComponent implements OnInit {

    empresas: Empresa[];

    filtroEmpresa = new FiltroEmpresa();

    @ViewChild('tabela') tabela: any;

    constructor(
        private router: Router,
        private empresaService: EmpresaService,
        private notificacao: NotificacaoService,
        private error: ErroHandlerService,
        private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.carregarEmpresas();
    }

    pesquisar () {
        this.empresaService.pesquisar(this.filtroEmpresa).then(empresas => {
            this.empresas = empresas;
        })
            .catch(error => {
                this.notificacao.atencao("A consulta não retornou nenhum resultado.")
                this.empresas = [];
            })
    }

    novaEmpresa () {
        return this.router.navigate(["/cadastro/empresas/novo"]);
    }

    confirmarExclusao (empresa: Empresa) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a empresa '${ empresa.razaoSocial }' ?`,
            accept: () => {
                this.excluir(empresa.id);
            }
        })
    }

    excluir (id: number) {
        this.empresaService.excluir(id).then(() => {
            this.carregarEmpresas();
            this.notificacao.sucesso("Empresa excluída com sucesso.");
        })
            .catch(error => {
                this.error.capturar(error);
            })
    }

    ativarOuDesativar (empresa: Empresa) {
        if (empresa.ativo) {
            this.desativar(empresa);
        } else {
            this.ativar(empresa);
        }
    }

    private ativar (empresa: Empresa) {
        this.empresaService.ativar(empresa.id).then(() => {
            this.notificacao.sucesso("Empresa ativada com sucesso.");
            empresa.ativo = true;
        })
            .catch(error => {
                this.error.capturar(error);
            })
    }

    private desativar (empresa: Empresa) {
        this.empresaService.desativar(empresa.id).then(() => {
            this.notificacao.sucesso("Empresa desativada com sucesso.");
            empresa.ativo = false;
        })
            .catch(error => {
                this.error.capturar(error);
            })
    }

    private carregarEmpresas () {
        this.empresaService.pesquisar(this.filtroEmpresa).then(empresas => {
            this.empresas = empresas;
        });
    }
}
