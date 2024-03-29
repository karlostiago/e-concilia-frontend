import {Injectable} from '@angular/core';
import {AbstractService} from "../../service/AbstractService";
import {UsuarioService} from "../configuracao/seguranca/usuario.service";
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {AlertaService} from "../../shared/alerta/alerta.service";
import {Router} from "@angular/router";
import {Seguranca} from "../../model/Seguranca";

@Injectable({
    providedIn: 'root'
})
export class SegurancaService extends AbstractService<UsuarioService> {

    private logado = false;
    private token: string;
    private seguranca: Seguranca;

    constructor(private httpClient: HttpClient,
                private alerta: AlertaService,
                private router: Router,
                protected override error: ErroHandlerService) {
        super(error);
    }

    async login(email: string, senha: string): Promise<void> {
        this.token = this.gerarToken(email, senha);
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/login`, {});

        return new Promise((resolve) => {
            request.subscribe({
                next: (response) => {
                    resolve();
                    this.logado = true;
                    this.seguranca = response as Seguranca;
                },
                error: (error) => {
                    this.logado = false;
                    this.seguranca = new Seguranca();
                    this.alerta.error("Usuário ou senha inválido.");
                }
            });
        })
    }

    async logout(): Promise<void> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/logout`, {});
        return new Promise((resolve) => {
            request.subscribe({
                next: () => {
                    resolve();
                    this.token = '';
                    this.logado = false;
                    this.seguranca = new Seguranca();
                    this.alerta.sucesso("Logout realizado com sucesso.");
                    this.router.navigate(['/login']);
                },
                error: (error) => {
                    this.alerta.error(error);
                }
            });
        });
    }

    getToken() {
        return this.token;
    }

    getUsuario() {
        return this.seguranca?.usuario;
    }

    isLogado(): boolean {
        return this.logado;
    }

    temPermissao(permissao: string) {
        return this.seguranca?.permissoes.includes(permissao);
    }

    protected pathURL(): string {
        return "seguranca";
    }

    private gerarToken(username: string, password: string) {
        return window.btoa(username + ":" + password);
    }
}
