import {Component, OnInit} from '@angular/core';
import {Operadora} from "../../../model/Operadora";
import {OperadoraService} from "../operadora.service";
import {FiltroOperadora} from "../../../model/FiltroOperadora";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
import {Empresa} from "../../../model/Empresa";
import {ConfirmationService} from "primeng/api";
import {ErroHandlerService} from "../../../core/ErroHandlerService";

@Component({
  selector: 'app-operadora-consulta',
  templateUrl: './operadora-consulta.component.html',
  styleUrls: ['./operadora-consulta.component.css']
})
export class OperadoraConsultaComponent implements OnInit {

    operadoras: Operadora[];
    filtroOperadora = new FiltroOperadora();

    constructor(private operadoraService: OperadoraService,
                private notificacao: NotificacaoService,
                private error: ErroHandlerService,
                private confirmationService: ConfirmationService) { }


    ngOnInit(): void {
        this.carregarOperadoras();
    }

    pesquisar () {
        this.operadoraService.pesquisar(this.filtroOperadora).then(operadoras => {
            this.operadoras = operadoras;
        })
        .catch(error => {
            this.notificacao.atencao("A consulta não retornou nenhum resultado.")
            this.operadoras = [];
        })
    }

    confirmarExclusao (operadora: Operadora) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a operadora '${ operadora.descricao }' ?`,
            accept: () => {
                this.excluir(operadora.id);
            }
        })
    }

    private excluir (id: number) {
        this.operadoraService.excluir(id).then(() => {
            this.carregarOperadoras();
            this.notificacao.sucesso("Empresa excluída com sucesso.");
        })
        .catch(error => {
            this.error.capturar(error);
        })
    }

    private carregarOperadoras () {
        this.operadoraService.pesquisar(this.filtroOperadora).then(operadoras => {
            this.operadoras = operadoras;
        });
    }
}
