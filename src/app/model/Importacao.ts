import {Operadora} from "./Operadora";
import {Empresa} from "./Empresa";

export class Importacao {
    dataInicial = new Date();
    dataFinal = new Date();
    operadora = new Operadora();
    empresa = new Empresa();
    situacao: string;
}
