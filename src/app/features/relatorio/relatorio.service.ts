import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {AbstractService} from "../../service/AbstractService";
import {Relatorio} from "../../model/Relatorio";
import {DataHelpers} from "../../../helpers/DataHelpers";

@Injectable({
  providedIn: 'root'
})
export class RelatorioService extends AbstractService<Relatorio> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    pathURL() {
        return 'relatorios';
    }

    async buscarTaxas(dataInicial: Date, dataFinal: Date, empresaId: number, operadoraId: number, tipoRelatorio: string) {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/gerar/csv/taxas?dataInicial=${DataHelpers.formatUs(dataInicial)}&dataFinal=${DataHelpers.formatUs(dataFinal)}&empresaId=${empresaId}&operadoraId=${operadoraId}&tipo=${tipoRelatorio}`, { responseType: 'blob' });
        return this.toPromise(request);
    }

    async buscarVendas(dataInicial: Date, dataFinal: Date, empresaId: number, operadoraId: number, tipoRelatorio: string) {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/gerar/csv/vendas?dataInicial=${DataHelpers.formatUs(dataInicial)}&dataFinal=${DataHelpers.formatUs(dataFinal)}&empresaId=${empresaId}&operadoraId=${operadoraId}&tipo=${tipoRelatorio}`, { responseType: 'blob' });
        return this.toPromise(request);
    }

    async buscarConciliacao() {

    }
}
