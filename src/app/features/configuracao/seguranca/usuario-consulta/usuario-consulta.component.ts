import {Component, OnInit} from '@angular/core';
import {AlertaService} from "../../../../shared/alerta/alerta.service";
import {ConfirmationService} from "primeng/api";
import {Usuario} from "../../../../model/Usuario";
import {FiltroUsuario} from "../../../../filter/FiltroUsuario";
import {UsuarioService} from "../usuario.service";
import {SegurancaService} from "../../../seguranca/seguranca.service";

@Component({
    selector: 'app-usuario-consulta',
    templateUrl: './usuario-consulta.component.html',
    styleUrls: ['./usuario-consulta.component.css']
})
export class UsuarioConsultaComponent implements OnInit {

    usuarios: Usuario[];
    filtroUsuario = new FiltroUsuario();

    constructor(private usuarioService: UsuarioService,
                private alerta: AlertaService,
                public segurancaService: SegurancaService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.carregarUsuarios();
    }

    async pesquisar() {
        await this.usuarioService.pesquisar(this.filtroUsuario).then(usuarios => {
            this.usuarios = usuarios;
        });

        if (this.usuarios.length === 0) {
            this.alerta.atencao("A consulta não retornou nenhum resultado.")
            this.usuarios = [];
        }
    }

    confirmarExclusao(usuario: Usuario) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir o usuário '${usuario.nomeCompleto}' ?`,
            accept: () => {
                this.excluir(usuario.id);
            }
        });
    }

    private excluir(id: number) {
        this.usuarioService.excluir(id).then(() => {
            this.carregarUsuarios();
            this.alerta.sucesso("Usuário excluído com sucesso.");
        });
    }

    private carregarUsuarios() {
        this.usuarioService.pesquisar(this.filtroUsuario).then(usuarios => {
            this.usuarios = usuarios;
        });
    }
}
