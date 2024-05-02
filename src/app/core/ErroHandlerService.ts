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
            console.log('::: Acesso não autorizado :::')
        }
        else if (errorResponse.status === 403) {
            this.notificacao.error('Acesso não permitido.');
        }
        else {
            for (const erro of errorResponse.error) {
                if (erro['severidade'] === 'ATENCAO') {
                    this.notificacao.atencao(erro['mensagem']);
                } else if (erro['severidade'] === 'INFO') {
                    this.notificacao.sucesso(erro['mensagem']);
                } else {
                    this.notificacao.error(erro['mensagem']);
                }
            }
        }
    }
}
