import {Injectable} from '@angular/core';
import {AbstractService} from "../../service/AbstractService";
import {Venda} from "../../model/Venda";
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {DataHelpers} from "../../../helpers/DataHelpers";

@Injectable({
  providedIn: 'root'
})
export class ConciliadorIfoodService extends AbstractService<Venda>{

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    pathURL() {
        return 'conciliadores/ifood';
    }

    async buscarVendas(lojaId: string, dtVendaDe: Date, dtVendaAte: Date): Promise<Venda[]> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?lojaId=${lojaId}&dtInicial=${DataHelpers.formatUs(dtVendaDe)}&dtFinal=${DataHelpers.formatUs(dtVendaAte)}`, this.options());
        return this.toPromise(request);
    }
}
