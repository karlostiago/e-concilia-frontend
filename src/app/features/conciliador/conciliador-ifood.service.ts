import {Injectable} from '@angular/core';
import {AbstractService} from "../../service/AbstractService";
import {Venda} from "../../model/Venda";
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {DataHelpers} from "../../../helpers/DataHelpers";
import {Conciliador} from "../../model/Conciliador";
import {SegurancaService} from "../seguranca/seguranca.service";
import {FiltroEmpresa} from "../../filter/FiltroEmpresa";
import {Empresa} from "../../model/Empresa";

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

    async buscarVendas(lojaId: string, dtVendaDe: Date, dtVendaAte: Date, metodoPagamento: string, bandeira: string, tipoRecebimento: string): Promise<Conciliador> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?lojaId=${lojaId}&dtInicial=${DataHelpers.formatUs(dtVendaDe)}&dtFinal=${DataHelpers.formatUs(dtVendaAte)}&metodoPagamento=${metodoPagamento}&bandeira=${bandeira}&tipoRecebimento=${tipoRecebimento}`, this.options());
        return this.toPromise(request);
    }
}
