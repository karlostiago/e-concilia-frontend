import {Endereco} from "./Endereco";
import {Contato} from "./Contato";
export class Empresa {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    endereco =  new Endereco();
    contato = new Contato();
}
