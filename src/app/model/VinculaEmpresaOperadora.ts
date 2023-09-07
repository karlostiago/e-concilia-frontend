import {Empresa} from "./Empresa";
import {Operadora} from "./Operadora";

export class VinculaEmpresaOperadora {
    id: number;
    empresa = new Empresa();
    operadora = new Operadora();
    codigoIntegracao: string;
}
