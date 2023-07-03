import {Empresa} from "./Empresa";
import {Operadora} from "./Operadora";

export class Contrato {
    empresa = new Empresa();
    operadora = new Operadora();
    ativo: boolean;
}
