import {Injectable} from '@angular/core';
import {AbstractService} from "../../service/AbstractService";
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {Dashboard} from "../../model/Dashboard";
import {DataHelpers} from "../../../helpers/DataHelpers";
import {GraficoVendaUltimo7Dia} from "../../model/GraficoVendaUltimo7Dia";
import {GraficoVendaUltimo7DiaCreditoDebito} from "../../model/GraficoVendaUltimo7DiaCreditoDebito";
import {GraficoVendaUltimo7DiaDinheiroPix} from "../../model/GraficoVendaUltimo7DiaDinheiroPix";
import {GraficoVendaMensal} from "../../model/GraficoVendaMensal";
import {GraficoVendaAnual} from "../../model/GraficoVendaAnual";

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends AbstractService<Dashboard> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    protected pathURL(): string {
        return "dashboard";
    }

    async buscarInformacoes(empresaId: string, dtVendaDe: Date, dtVendaAte: Date): Promise<Dashboard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?lojaId=${empresaId}&dtInicial=${DataHelpers.formatUs(dtVendaDe)}&dtFinal=${DataHelpers.formatUs(dtVendaAte)}`, this.options());
        return this.toPromise(request);
    }

    async buscarVendasUltimos7Dias(empresaId: string): Promise<GraficoVendaUltimo7Dia> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/buscar-venda-ultimos-7-dias?lojaId=${empresaId}`, this.options());
        return this.toPromise(request);
    }

    async buscarVendasUltimos7DiasCreditoDebito(empresaId: string): Promise<GraficoVendaUltimo7DiaCreditoDebito> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/buscar-venda-ultimos-7-dias-credito-debito`, this.options());
        return this.toPromise(request);
    }

    async buscarVendasUltimos7DiasDinheiroPix(empresaId: string): Promise<GraficoVendaUltimo7DiaDinheiroPix> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/buscar-venda-ultimos-7-dias-dinheito-pix`, this.options());
        return this.toPromise(request);
    }

    async buscarPercentualVendasFormaPagamento(empresaId: string): Promise<GraficoVendaUltimo7Dia> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/buscar-percentual-venda-forma-pagamento`, this.options());
        return this.toPromise(request);
    }

    async buscarVendaMensal(empresaId: string, dtInicial: Date, dtFinal: Date): Promise<GraficoVendaMensal> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/buscar-venda-mensal?lojaId=${empresaId}&dtInicial=${DataHelpers.formatUs(dtInicial)}&dtFinal=${DataHelpers.formatUs(dtFinal)}`, this.options());
        return this.toPromise(request);
    }

    async buscarVendaAnual(): Promise<GraficoVendaAnual> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/buscar-venda-anual`, this.options());
        return this.toPromise(request);
    }
}
