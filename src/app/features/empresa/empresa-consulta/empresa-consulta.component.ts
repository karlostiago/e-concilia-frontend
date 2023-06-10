import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Empresa} from "../../../model/Empresa";
import {EmpresaService} from "../empresa.service";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {FiltroEmpresa} from "../../../model/FiltroEmpresa";

@Component({
  selector: 'app-empresa-consulta',
  templateUrl: './empresa-consulta.component.html',
  styleUrls: ['./empresa-consulta.component.css']
})
export class EmpresaConsultaComponent implements OnInit {

    empresas: Empresa[];

    filtroEmpresa = new FiltroEmpresa();

    constructor(
        private router: Router,
        private empresaService: EmpresaService,
        private notificacao: NotificacaoService,
        private error: ErroHandlerService) { }

    ngOnInit(): void {
        this.empresaService.pesquisar(this.filtroEmpresa).then(empresas => {
            this.empresas = empresas;
        });
    }

    async pesquisar () {
        this.empresaService.pesquisar(this.filtroEmpresa).then(empresas => {
            this.notificacao.sucesso("Consulta concluída com sucesso.");
            this.empresas = empresas;
        })
        .catch(error => {
            this.notificacao.atencao("A consulta não retornou nenhum resultado.")
            this.empresas = [];
        })
    }

    novaEmpresa() {
        return this.router.navigate(["/cadastro/empresas/novo"]);
    }
}
