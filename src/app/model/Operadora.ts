import {Taxa} from "./Taxa";

export class Operadora {
    id: number;
    descricao: string;
    taxas = new Array<Taxa>();
    ativo: boolean;
}
