import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../../model/Usuario";
import {NgForm} from "@angular/forms";
import {NotificacaoService} from "../../../../shared/notificacao/notificacao.service";
import {ActivatedRoute} from "@angular/router";
import {UsuarioService} from "../usuario.service";

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

    usuario = new Usuario();

    constructor(private usuarioService: UsuarioService,
                private notificacao: NotificacaoService,
                private activatedRoute: ActivatedRoute,) {
    }

    ngOnInit(): void {
        const usuarioId = this.activatedRoute.snapshot.params['id'];

        if (usuarioId) {
            this.pesquisarPorId(usuarioId);
        }
    }

    pesquisarPorId (id: number) {
        this.usuarioService.pesquisarPorId(id).then(response => {
            this.usuario = response;
            this.usuario.confirmaSenha = response.senha;
            this.usuario.confirmaEmail = response.email;
        });
    }

    async salvarOuEditar (form: NgForm) {
        if (this.usuario.id) {
            await this.editar();
        } else {
            await this.salvar(form);
        }
    }

    private async salvar (form: NgForm) {
        this.usuarioService.salvar(this.usuario)
            .then(resposta => {
                this.notificacao.sucesso("Usuário cadastrado com sucesso.");
                this.usuario = new Usuario();
                form.resetForm();
            });
    }

    private async editar () {
        this.usuarioService.editar(this.usuario)
            .then(resposta => {
                this.notificacao.sucesso("Usuário atualizado com sucesso.");
            });
    }
}
