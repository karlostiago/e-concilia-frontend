import {Injectable} from '@angular/core';
import {AbstractService} from "../../service/AbstractService";
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {Dashboard} from "../../model/Dashboard";
import {DataHelpers} from "../../../helpers/DataHelpers";

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

    async buscarInformacoes(empresaId: number, dtVendaDe: Date, dtVendaAte: Date): Promise<Dashboard> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?lojaId=${empresaId}&dtInicial=${DataHelpers.formatUs(dtVendaDe)}&dtFinal=${DataHelpers.formatUs(dtVendaAte)}`, this.options());
        return this.toPromise(request);
    }
}
