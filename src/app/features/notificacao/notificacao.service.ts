import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Operadora} from "../../model/Operadora";
import {AbstractService} from "../../service/AbstractService";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {Notificacao} from "../../model/Notificacao";
import {Mensagem} from "../../model/Mensagem";

@Injectable({
    providedIn: 'root'
})
export class NotificacaoService extends AbstractService<Operadora> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    pathURL() {
        return 'notificacoes';
    }

    async pesquisar(usuarioId: number): Promise<Notificacao> {
        if (usuarioId === undefined) {
            usuarioId = -1;
        }
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?usuarioId=${usuarioId}`, this.options());
        return this.toPromise(request);
    }

    async marcarComoLida(mensagem: Mensagem) {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/marcar-como-lida/${mensagem.id}`, this.options());
        return this.toPromise(request);
    }

    async marcarComoResolvida(mensagem: Mensagem) {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/marcar-como-resolvida/${mensagem.id}`, this.options());
        return this.toPromise(request);
    }
}
