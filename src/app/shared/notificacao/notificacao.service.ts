import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

    constructor( private messageService: MessageService ) { }

    sucesso (mensagem: string) {
        this.messageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: mensagem,
        })
    }

    error (mensagem: string) {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: mensagem
        })
    }
}
