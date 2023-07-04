import {Injectable} from "@angular/core";
import {NotificacaoService} from "../shared/notificacao/notificacao.service";

@Injectable({
    providedIn: 'root'
})
export class ErroHandlerService {

    constructor(private notificacao: NotificacaoService) { }

    capturar(errorResponse: any) {
        console.log(errorResponse.error)
        for (const erro of errorResponse.error) {
            this.notificacao.error(erro.mensagem);
        }
    }
}
