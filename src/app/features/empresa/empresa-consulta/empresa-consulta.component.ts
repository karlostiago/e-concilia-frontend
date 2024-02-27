import {Component, OnInit, ViewChild} from '@angular/core';
import {Empresa} from "../../../model/Empresa";
import {EmpresaService} from "../empresa.service";
import {AlertaService} from "../../../shared/alerta/alerta.service";
import {FiltroEmpresa} from "../../../filter/FiltroEmpresa";
import {ConfirmationService} from "primeng/api";
import {SegurancaService} from "../../seguranca/seguranca.service";

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
        public segurancaService: SegurancaService,
        private empresaService: EmpresaService,
        private alerta: AlertaService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.carregarEmpresas();
    }

    async pesquisar() {
        await this.empresaService.pesquisar(this.filtroEmpresa).then(empresas => {
            this.empresas = empresas;
        });

        if (this.empresas.length === 0) {
            this.alerta.atencao("A consulta não retornou nenhum resultado.");
            this.empresas = [];
        }
    }

    confirmarExclusao(empresa: Empresa) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a empresa '${empresa.razaoSocial}' ?`,
            accept: () => {
                this.excluir(empresa.id);
            }
        })
    }

    excluir(id: number) {
        this.empresaService.excluir(id).then(() => {
            this.carregarEmpresas();
            this.alerta.sucesso("Empresa excluída com sucesso.");
        });
    }

    ativarOuDesativar(empresa: Empresa) {
        if (empresa.ativo) {
            this.desativar(empresa);
        } else {
            this.ativar(empresa);
        }
    }

    private ativar(empresa: Empresa) {
        this.empresaService.ativar(empresa.id).then(() => {
            this.alerta.sucesso("Empresa ativada com sucesso.");
            empresa.ativo = true;
        });
    }

    private desativar(empresa: Empresa) {
        this.empresaService.desativar(empresa.id).then(() => {
            this.alerta.sucesso("Empresa desativada com sucesso.");
            empresa.ativo = false;
        });
    }

    private carregarEmpresas() {
        this.empresaService.pesquisar(this.filtroEmpresa).then(empresas => {
            this.empresas = empresas;
        });
    }
}
