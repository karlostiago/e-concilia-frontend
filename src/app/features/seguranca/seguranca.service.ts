import {Injectable} from '@angular/core';
import {AbstractService} from "../../service/AbstractService";
import {UsuarioService} from "../configuracao/seguranca/usuario.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {NotificacaoService} from "../../shared/notificacao/notificacao.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SegurancaService extends AbstractService<UsuarioService>{

    private logado = false;
    private token: string;

    constructor(private httpClient: HttpClient,
                private notificacao: NotificacaoService,
                protected override error: ErroHandlerService) {
        super(error);
    }

    async login (email: string, senha: string): Promise<void> {
        let headers = new HttpHeaders();
        this.token = this.gerarToken(email, senha);

        headers = headers.append("Content-Type", "application/json");
        headers = headers.append("Authorization", "Basic " + this.token);

        const options = {
            headers: headers
        }

        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/login`, options);

        return new Promise((resolve) => {
            request.subscribe({
                next: () => {
                    resolve();
                    this.logado = true;
                },
                error: (error) => {
                    this.logado = false;
                    this.notificacao.error("Usuário ou senha inválido.");
                }
            });
        })
    }

    getToken() {
        return this.token;
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
