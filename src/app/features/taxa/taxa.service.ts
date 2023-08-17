import {Injectable} from '@angular/core';
import {AbstractService} from "../../service/AbstractService";
import {Taxa} from "../../model/Taxa";
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {Contrato} from "../../model/Contrato";
import {Operadora} from "../../model/Operadora";

@Injectable({
  providedIn: 'root'
})
export class TaxaService extends AbstractService<Taxa> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    async validarTaxa (taxa: Taxa): Promise<Taxa> {
        const request = this.httpClient.post(`${this.baseURL}/taxas/validar`, JSON.stringify(taxa), this.options());
        return this.toPromise(request);
    }

    async buscarPorContrato (contrato: Contrato): Promise<Taxa[]> {
        const request = this.httpClient.get(`${this.baseURL}/taxas/${contrato.numero}/contrato`, this.options());
        return this.toPromise(request);
    }

    async buscarPorOperadora (operadora: Operadora): Promise<Taxa[]> {
        const request = this.httpClient.get(`${this.baseURL}/taxas/${operadora.id}/operadora`, this.options());
        return this.toPromise(request);
    }

    async buscarTodos (): Promise<Taxa[]> {
        const request = this.httpClient.get(`${this.baseURL}/taxas`, this.options());
        return this.toPromise(request);
    }
}
