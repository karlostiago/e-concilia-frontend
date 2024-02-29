import {Injectable} from "@angular/core";
import {AlertaService} from "../shared/alerta/alerta.service";

@Injectable({
    providedIn: 'root'
})
export class ErroHandlerService {

    constructor(private notificacao: AlertaService) {
    }

    capturar(errorResponse: any) {
        if (errorResponse.status === 401) {
            // this.notificacao.error('Não autorizado.');
        }
        else if (errorResponse.status === 403) {
            this.notificacao.error('Acesso não permitido.');
        }
        else {
            for (const erro of errorResponse.error) {
                this.notificacao.error(erro['mensagem']);
            }
        }
    }
}
