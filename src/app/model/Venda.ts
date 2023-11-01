import {Pagamento} from "./Pagamento";
import {Cobranca} from "./Cobranca";

export class Venda {
    dataPedido: Date;
    pedidoId: string;
    dataUltimoProcessamento: Date;
    numeroDocumento: string;
    modeloNegocio: string;
    conciliado = false;
    pagamento = new Pagamento();
    cobranca = new Cobranca();
    diferenca: number;

    valorTotalPedido: number;
    valorCancelado: number;
}
