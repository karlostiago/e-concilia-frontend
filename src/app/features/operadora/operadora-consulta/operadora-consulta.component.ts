import {Component, OnInit} from '@angular/core';
import {Operadora} from "../../../model/Operadora";
import {OperadoraService} from "../operadora.service";
import {FiltroOperadora} from "../../../filter/FiltroOperadora";
import {AlertaService} from "../../../shared/alerta/alerta.service";
import {ConfirmationService} from "primeng/api";
import {SegurancaService} from "../../seguranca/seguranca.service";

@Component({
    selector: 'app-operadora-consulta',
    templateUrl: './operadora-consulta.component.html',
    styleUrls: ['./operadora-consulta.component.css']
})
export class OperadoraConsultaComponent implements OnInit {

    operadoras: Operadora[];
    filtroOperadora = new FiltroOperadora();

    constructor(private operadoraService: OperadoraService,
                private alerta: AlertaService,
                public segurancaService: SegurancaService,
                private confirmationService: ConfirmationService) {
    }


    ngOnInit(): void {
        this.carregarOperadoras();
    }

    async pesquisar() {
        await this.operadoraService.pesquisar(this.filtroOperadora).then(operadoras => {
            this.operadoras = operadoras;
        });

        if (this.operadoras.length === 0) {
            this.alerta.atencao("A consulta não retornou nenhum resultado.")
            this.operadoras = [];
        }
    }

    confirmarExclusao(operadora: Operadora) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir a operadora '${operadora.descricao}' ?`,
            accept: () => {
                this.excluir(operadora.id);
            }
        });
    }

    private excluir(id: number) {
        this.operadoraService.excluir(id).then(() => {
            this.carregarOperadoras();
            this.alerta.sucesso("Empresa excluída com sucesso.");
        });
    }

    private carregarOperadoras() {
        this.operadoraService.pesquisar(this.filtroOperadora).then(operadoras => {
            this.operadoras = operadoras;
        });
    }
}
