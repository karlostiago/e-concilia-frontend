import {Operadora} from "./Operadora";
import {Empresa} from "./Empresa";
import {DataHelpers} from "../../helpers/DataHelpers";

export class Importacao {
    dataInicial = new Date();
    dataFinal = new Date();
    operadora = new Operadora();
    empresa = new Empresa();
    executadoAs: Date;
    situacao: string;

    constructor() {
        DataHelpers.removeDias(this.dataInicial, 1);
        DataHelpers.removeDias(this.dataFinal, 1);
    }
}
