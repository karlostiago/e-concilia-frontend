import {GraficoVendaUltimo7Dia} from "./GraficoVendaUltimo7Dia";
import {GraficoVendaMensal} from "./GraficoVendaMensal";
import {GraficoVendaAnual} from "./GraficoVendaAnual";
import {GraficoVendaPercentualFormaPagamento} from "./GraficoVendaPercentualFormaPagamento";
import {GraficoVendaUltimo7DiaCreditoDebito} from "./GraficoVendaUltimo7DiaCreditoDebito";
import {GraficoVendaUltimo7DiaDinheiroPix} from "./GraficoVendaUltimo7DiaDinheiroPix";

export class Grafico {
    graficoVendaUltimo7DiaDTO = new GraficoVendaUltimo7Dia();
    graficoVendaMensalDTO = new GraficoVendaMensal();
    graficoVendaAnualDTO = new GraficoVendaAnual();
    graficoPercentualVendaFormaPagamentoDTO = new GraficoVendaPercentualFormaPagamento();
    graficoVendaUltimo7DiaCreditoDebitoDTO = new GraficoVendaUltimo7DiaCreditoDebito();
    graficoVendaUltimo7DiaDinheiroPixDTO = new GraficoVendaUltimo7DiaDinheiroPix();
}
