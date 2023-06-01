import {Endereco} from "./Endereco";

export class Empresa {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    endereco =  new Endereco();
}
