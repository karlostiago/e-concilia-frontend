import {DataHelpers} from "../../helpers/DataHelpers";

export class FiltroRelatorio {
    dataInicial: Date;
    dataFinal: Date;
    tipoRelatorio: string;
    empresaId: number;
    operadoraId: number;

    constructor() {
        this.dataInicial = new Date(DataHelpers.remove30Dias(new Date()));
        this.dataFinal = new Date();
    }
}
