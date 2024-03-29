import {Component, OnInit} from '@angular/core';
import {FiltroUsuario} from "../../../../filter/FiltroUsuario";
import {AlertaService} from "../../../../shared/alerta/alerta.service";
import {ConfirmationService} from 'primeng/api';
import {PermissaoService} from "../permissao.service";
import {Permissao} from "../../../../model/Permissao";
import {TipoPermissao} from "../../../../model/TipoPermissao";
import {SegurancaService} from "../../../seguranca/seguranca.service";

@Component({
    selector: 'app-permissao-consulta',
    templateUrl: './permissao-consulta.component.html',
    styleUrls: ['./permissao-consulta.component.css']
})
export class PermissaoConsultaComponent implements OnInit {

    nomeCompleto: string;
    tipoPermissao: string;

    tipoPermissoes = new Array<String>();
    permissoes = new Array<Permissao>()

    filtroUsuario = new FiltroUsuario();

    constructor(public segurancaService: SegurancaService,
                private permissaoService: PermissaoService,
                private alerta: AlertaService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.pesquisar();
        this.carregarTipoPermissoes();
    }

    async pesquisar() {
        await this.permissaoService.pesquisar(this.nomeCompleto, this.tipoPermissao).then(permissoes => {
            this.permissoes = permissoes;
        });

        if (this.permissoes.length === 0) {
            this.alerta.atencao("A consulta não retornou nenhum resultado.")
            this.permissoes = [];
        }
    }

    confirmarExclusao(permissao: Permissao) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a permissão para o usuário '${permissao.usuario.nomeCompleto}' ?`,
            accept: () => {
                this.excluir(permissao.id);
            }
        });
    }

    private excluir(id: number) {
        this.permissaoService.excluir(id).then(() => {
            this.alerta.sucesso("Permissão excluído com sucesso.");
            this.pesquisar();
        });
    }

    private carregarTipoPermissoes() {
        for (const tipoKey in TipoPermissao) {
            // @ts-ignore
            this.tipoPermissoes.push(TipoPermissao[`${tipoKey}`].toUpperCase());
        }
    }
}
