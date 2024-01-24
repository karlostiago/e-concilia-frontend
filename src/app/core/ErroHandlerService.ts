import {Injectable} from "@angular/core";
import {NotificacaoService} from "../shared/notificacao/notificacao.service";

@Injectable({
    providedIn: 'root'
})
export class ErroHandlerService {

    constructor(private notificacao: NotificacaoService) { }

    capturar(errorResponse: any) {
        if (errorResponse.status === 403) {
            this.notificacao.error("Não tem permissão para acessar este recurso.");
            return;
        }

        for (const erro of errorResponse.error) {
            this.notificacao.error(erro.mensagem);
        }
    }
}
