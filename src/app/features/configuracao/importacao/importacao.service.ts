import {Injectable} from '@angular/core';
import {AbstractService} from "../../../service/AbstractService";
import {Importacao} from "../../../model/Importacao";
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../../core/ErroHandlerService";

@Injectable({
    providedIn: 'root'
})
export class ImportacaoService extends AbstractService<Importacao> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    pathURL() {
        return 'importacoes';
    }

    async agendar(importacao: Importacao): Promise<Importacao> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}`, JSON.stringify(importacao), this.options());
        return this.toPromise(request);
    }

    async buscarPorAgendados(): Promise<Importacao[]> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}`, this.options());
        return this.toPromise(request);
    }
}
