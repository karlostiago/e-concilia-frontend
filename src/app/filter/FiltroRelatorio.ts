import {DataHelpers} from "../../helpers/DataHelpers";
import {AlertaService} from "../shared/alerta/alerta.service";

export class FiltroRelatorio {
    dataInicial: Date;
    dataFinal: Date;
    tipoRelatorio: string;
    empresaId: number;
    operadoraId: number;

    constructor(private alertaService: AlertaService) {
        this.inicializarDatas();
    }

    limpar() {
        this.inicializarDatas();
        this.empresaId = -1;
        this.operadoraId = -1;
        this.tipoRelatorio = "";
    }

    validar() {
        let valido: boolean = true;
        if (this.tipoRelatorio === undefined || this.tipoRelatorio === "") {
            this.alertaService.error("Campo tipo relatório não foi informado.");
            valido = false;
        }
        if (this.empresaId === undefined || this.empresaId === -1) {
            this.alertaService.error("Campo empresa não foi informado.");
            valido = false;
        }
        if (this.operadoraId === undefined || this.operadoraId === -1) {
            this.alertaService.error("Campo operadora não foi informado.");
            valido = false;
        }
        if (this.dataInicial === undefined) {
            this.alertaService.error("Campo data inicial não foi informado.");
            valido = false;
        }
        if (this.dataFinal === undefined) {
            this.alertaService.error("Campo data final não foi informado.");
            valido = false;
        }

        return valido;
    }

    private inicializarDatas() {
        this.dataInicial = new Date();
        this.dataFinal = new Date();
        DataHelpers.remove30Dias(this.dataInicial);
    }
}
