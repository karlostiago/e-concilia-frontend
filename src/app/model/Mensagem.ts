import {Empresa} from "./Empresa";

export class Mensagem {
    id: number;
    empresa = new Empresa();
    conteudo: string;
    lida: boolean;
    resolvida: boolean
}
