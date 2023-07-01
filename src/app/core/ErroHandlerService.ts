import {Injectable} from "@angular/core";
import {NotificacaoService} from "../shared/notificacao/notificacao.service";

@Injectable({
    providedIn: 'root'
})
export class ErroHandlerService {

    constructor(private notificacao: NotificacaoService) { }

    capturar(errorResponse: any) {
        if (errorResponse.error) {
            this.notificacao.error(errorResponse.error.message);
        }

        if (errorResponse.error.errors) {
            for (const err of errorResponse.error.errors) {
                this.notificacao.error(err.defaultMessage);
            }
        }
    }
}
