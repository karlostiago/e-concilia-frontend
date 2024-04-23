import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {AbstractService} from "../../service/AbstractService";
import {Relatorio} from "../../model/Relatorio";
import {DataHelpers} from "../../../helpers/DataHelpers";
import {AlertaService} from "../../shared/alerta/alerta.service";

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

    async buscarConciliacao(dataInicial: Date, dataFinal: Date, empresaId: number, operadoraId: number, tipoRelatorio: string) {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/gerar/csv/conciliacao?dataInicial=${DataHelpers.formatUs(dataInicial)}&dataFinal=${DataHelpers.formatUs(dataFinal)}&empresaId=${empresaId}&operadoraId=${operadoraId}&tipo=${tipoRelatorio}`, { responseType: 'blob' });
        return this.toPromise(request);
    }

    gerarCSV(nomeRelatorio: string, blob: Blob, alertaService: AlertaService) {
        if (blob.size > 0) {
            const baixar = document.createElement("a");
            baixar.href = window.URL.createObjectURL(blob);
            baixar.download = `${nomeRelatorio}.csv`;
            baixar.click();
        } else {
            alertaService.atencao("Nenhum registro encontrado, com os filtros informados.");
        }
    }
}
