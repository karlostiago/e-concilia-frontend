import {Injectable} from "@angular/core";
import {NotificacaoService} from "../shared/notificacao/notificacao.service";

@Injectable({
    providedIn: 'root'
})
export class ErroHandlerService {

    constructor(private notificacao: NotificacaoService) { }

    capturar(erro: any) {
        this.notificacao.error(erro.message);
    }
}
