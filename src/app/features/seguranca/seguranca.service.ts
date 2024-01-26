import {Injectable} from '@angular/core';
import {AbstractService} from "../../service/AbstractService";
import {UsuarioService} from "../configuracao/seguranca/usuario.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {NotificacaoService} from "../../shared/notificacao/notificacao.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Usuario} from "../../model/Usuario";
import {FiltroUsuario} from "../../filter/FiltroUsuario";

@Injectable({
  providedIn: 'root'
})
export class SegurancaService extends AbstractService<UsuarioService>{

    private logado = false;
    private token: string;
    private usuarioLogado: Usuario | null;

    constructor(private httpClient: HttpClient,
                private notificacao: NotificacaoService,
                protected override error: ErroHandlerService) {
        super(error);
    }

    async login (email: string, senha: string): Promise<void> {
        this.token = this.gerarToken(email, senha);
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/login`, { });

        return new Promise((resolve) => {
            request.subscribe({
                next: (response) => {
                    resolve();
                    this.logado = true;
                    this.usuarioLogado = response as Usuario;
                },
                error: (error) => {
                    this.logado = false;
                    this.usuarioLogado = null;
                    this.notificacao.error("Usuário ou senha inválido.");
                }
            });
        })
    }

    getToken() {
        return this.token;
    }

    getUsuario() {
        return this.usuarioLogado;
    }

    isLogado(): boolean {
        return this.logado;
    }

    protected pathURL(): string {
        return "seguranca";
    }

    private gerarToken(username: string, password: string) {
        return window.btoa(username + ":" + password);
    }
}
