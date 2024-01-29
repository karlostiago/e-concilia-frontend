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

    pathURL() {
        return 'taxas';
    }

    async validarTaxa(taxa: Taxa): Promise<Taxa> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}/validar`, JSON.stringify(taxa), this.options());
        return this.toPromise(request);
    }

    async buscarPorContrato(contrato: Contrato): Promise<Taxa[]> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${contrato.numero}/contrato`, this.options());
        return this.toPromise(request);
    }

    async buscarPorOperadora(operadora: Operadora): Promise<Taxa[]> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${operadora.id}/operadora`, this.options());
        return this.toPromise(request);
    }

    async buscarTodos(): Promise<Taxa[]> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}`, this.options());
        return this.toPromise(request);
    }

    async ativar(id: number): Promise<Taxa> {
        const request = this.httpClient.patch(`${this.baseURL}/${this.pathURL()}/${id}/ativar`, this.options());
        return this.toPromise(request);
    }

    async desativar(id: number): Promise<Taxa> {
        const request = this.httpClient.patch(`${this.baseURL}/${this.pathURL()}/${id}/desativar`, this.options());
        return this.toPromise(request);
    }
}
