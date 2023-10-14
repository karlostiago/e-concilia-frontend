import {Venda} from "./Venda";
import {Totalizador} from "./Totalizador";
import {ResumoFinanceiro} from "./ResumoFinanceiro";

export class Conciliador {
    vendas = new Array<Venda>();
    totalizador = new Totalizador();
    resumoFinanceiro = new ResumoFinanceiro();
}
