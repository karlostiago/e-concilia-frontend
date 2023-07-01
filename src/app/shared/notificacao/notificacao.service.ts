import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

    constructor( private messageService: MessageService ) { }

    sucesso (mensagem: string) {
        this.gerarMensagem(mensagem, 'success', 'Sucesso');
    }

    error (mensagem: string) {
        this.gerarMensagem(mensagem, 'error', 'Error');
    }

    atencao (mensagem: string) {
        this.gerarMensagem(mensagem, 'warn', 'Atenção');
    }

    private gerarMensagem (mensagem: string, severidade: string, sumario: string) {
        this.messageService.add({
            severity: severidade,
            summary: sumario,
            detail: mensagem
        });
    }
}
