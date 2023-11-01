import {DataHelpers} from "../../helpers/DataHelpers";

export class FiltroDashboard {
    empresaId = null;
    dtInicial = new Date();
    dtFinal = new Date();

    constructor() {
        DataHelpers.primeiroDiaMesCorrente(this.dtInicial);
        DataHelpers.ultimoDiaMesCorrente(this.dtFinal);
    }
}
