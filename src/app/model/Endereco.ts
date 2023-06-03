import {Estado} from "./Estado";
export class Endereco {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado = new Estado();
    cep: number;
}
