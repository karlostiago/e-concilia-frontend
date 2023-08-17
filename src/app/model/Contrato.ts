import {Empresa} from "./Empresa";
import {Operadora} from "./Operadora";
import {Taxa} from "./Taxa";

export class Contrato {
    numero: number;
    empresa = new Empresa();
    operadora = new Operadora();
    taxas = new Array<Taxa>();
    ativo: boolean;
}
