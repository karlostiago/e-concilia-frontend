import {Component, OnInit} from '@angular/core';
import {Taxa} from "../../../model/Taxa";
import {Operadora} from "../../../model/Operadora";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
import {OperadoraService} from "../operadora.service";
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";

@Component({
  selector: 'app-operadora-cadastro',
  templateUrl: './operadora-cadastro.component.html',
  styleUrls: ['./operadora-cadastro.component.css']
})
export class OperadoraCadastroComponent implements OnInit {

    operadora = new Operadora();
    taxa = new Taxa();
    visivel: boolean;

    constructor(
        private notificacao: NotificacaoService,
        private operadoraService: OperadoraService,
        private error: ErroHandlerService) {}

    ngOnInit(): void {

    }
    abrirModalCadastroNovaTaxa () {
        this.visivel = true;
    }
    salvarTaxa (taxa: Taxa) {
        this.operadoraService.validarTaxa(taxa).then(response => {
            taxa.expiraEm = response.expiraEm;
            taxa.ativo = taxa.expiraEm > 0;
            this.operadora.taxas.push(taxa);
            this.taxa = new Taxa();
            this.visivel = false;
        })
        .catch(error => {
            this.error.capturar(error);
        })
    }

    formatarMoeda(valor: number) {
        return FormatacaoMoedaPtBR.formatar(valor);
    }
}
