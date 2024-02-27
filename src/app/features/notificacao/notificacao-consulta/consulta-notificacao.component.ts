import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Notificacao} from "../../../model/Notificacao";
import {NotificacaoService} from "../notificacao.service";
import {SegurancaService} from "../../seguranca/seguranca.service";
import {Mensagem} from "../../../model/Mensagem";
import {AlertaService} from "../../../shared/alerta/alerta.service";

@Component({
  selector: 'app-notificacao-consulta',
  templateUrl: './consulta-notificacao.component.html',
  styleUrls: ['./consulta-notificacao.component.css']
})
export class ConsultaNotificacaoComponent implements OnInit {

    notificacao = new Notificacao();

    @Output() quantidade = new EventEmitter<number>();

    constructor(private notificacaoService: NotificacaoService,
                private alerta: AlertaService,
                private segurancaService: SegurancaService) { }

    ngOnInit(): void {
        this.pesquisar();
    }

    pesquisar() {
        this.notificacaoService.pesquisar(this.segurancaService.getUsuario()?.id).then(notificacao => {
            this.notificacao = notificacao;
            this.quantidade.emit(this.notificacao.mensagens.length);
        });
    }

    marcarComoLida(mensagem: Mensagem) {
        if (mensagem.lida) {
            this.alerta.atencao("Notifcação já esta marcada como lida.");
            return;
        }

        this.notificacaoService.marcarComoLida(mensagem).then(() => {
            mensagem.lida = true;
        });
    }

    marcarComoResolvida(mensagem: Mensagem) {
        this.notificacaoService.marcarComoResolvida(mensagem).then(() => {
            mensagem.lida = true;
            mensagem.resolvida = true;

            this.remover(mensagem.id);
        });
    }

    private remover(id: number) {
        const index = this.notificacao.mensagens
            .findIndex(mensagem => mensagem.id === id);

        if (index !== -1) {
            this.notificacao.mensagens.splice(index, 1);
            this.quantidade.emit(this.notificacao.mensagens.length);
        }
    }
}
