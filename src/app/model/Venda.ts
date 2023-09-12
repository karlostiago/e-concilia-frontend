import {Pagamento} from "./Pagamento";
import {Cobranca} from "./Cobranca";

export class Venda {
    dataPedido: Date;
    pedidoId: string;
    dataUltimoProcessamento: Date;
    numeroDocumento: string;
    modeloNegocio: string;
    pagamento = new Pagamento();
    cobranca = new Cobranca();
}
