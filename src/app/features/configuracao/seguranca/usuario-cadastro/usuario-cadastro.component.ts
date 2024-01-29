import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../../model/Usuario";
import {NgForm} from "@angular/forms";
import {NotificacaoService} from "../../../../shared/notificacao/notificacao.service";
import {ActivatedRoute} from "@angular/router";
import {UsuarioService} from "../usuario.service";
import {FiltroEmpresa} from "../../../../model/FiltroEmpresa";
import {EmpresaService} from "../../../empresa/empresa.service";
import {Empresa} from "../../../../model/Empresa";
import {SegurancaService} from "../../../seguranca/seguranca.service";
import {Perfil} from "../../../../model/Perfil";

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

    lojas: Empresa[];
    usuario = new Usuario();
    perfis = new Array<String>();

    constructor(private usuarioService: UsuarioService,
                private empresaService: EmpresaService,
                public segurancaService: SegurancaService,
                private notificacao: NotificacaoService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.carregarPerfis();
        const usuarioId = this.activatedRoute.snapshot.params['id'];

        if (usuarioId) {
            this.pesquisarPorId(usuarioId);
        }

        this.carregarEmpresas();
    }

    pesquisarPorId (id: number) {
        this.usuarioService.pesquisarPorId(id).then(response => {
            this.usuario = response;
            this.usuario.confirmaSenha = response.senha;
            this.usuario.confirmaEmail = response.email;
            this.usuario.perfil = this.usuario.perfil.toUpperCase();
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

    private carregarEmpresas () {
        this.empresaService.pesquisar(new FiltroEmpresa()).then(empresas => {
            this.lojas = empresas;
        });
    }

    private carregarPerfis () {
        for (const perfilKey in Perfil) {
            // @ts-ignore
            this.perfis.push(Perfil[`${perfilKey}`].toUpperCase());
        }
    }
}
