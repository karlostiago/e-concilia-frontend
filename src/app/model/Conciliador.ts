import {Empresa} from "./Empresa";
import {Produto} from "./Produto";

export class Conciliador {
    dataVenda = new Date();
    empresa = new Empresa();
    produto = new Produto();
    taxaPrevista: number;
    valorDiferenca: number;
    conciliado: boolean;
}
