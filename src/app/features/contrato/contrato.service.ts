import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Contrato} from "../../model/Contrato";
import {AbstractService} from "../../service/AbstractService";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {FiltroContrato} from "../../filter/FiltroContrato";

@Injectable({
    providedIn: 'root'
})
export class ContratoService extends AbstractService<Contrato> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    pathURL() {
        return 'contratos';
    }

    async salvar(contrato: Contrato): Promise<Contrato> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}`, JSON.stringify(contrato), this.options());
        return this.toPromise(request);
    }

    async editar(contrato: Contrato): Promise<Contrato> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${contrato.numero}`, JSON.stringify(contrato), this.options());
        return this.toPromise(request);
    }

    async excluir(id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    async pesquisarPorId(id: number): Promise<Contrato> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    async pesquisar(filtro: FiltroContrato): Promise<Contrato[]> {
        const request = this.aplicarFiltro(filtro);
        return this.toPromise(request);
    }

    async ativar(id: number): Promise<Contrato> {
        const request = this.httpClient.patch(`${this.baseURL}/${this.pathURL()}/${id}/ativar`, this.options());
        return this.toPromise(request);
    }

    async desativar(id: number): Promise<Contrato> {
        const request = this.httpClient.patch(`${this.baseURL}/${this.pathURL()}/${id}/desativar`, this.options());
        return this.toPromise(request);
    }

    private aplicarFiltro(filtro: FiltroContrato) {
        let request = null;

        if (filtro.empresaId !== null && filtro.operadoraId != null) {
            request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?empresaId=${filtro.empresaId}&operadoraId=${filtro.operadoraId}`, this.options());
        } else if (filtro.empresaId !== null) {
            request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?empresaId=${filtro.empresaId}`, this.options());
        } else if (filtro.operadoraId !== null) {
            request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?operadoraId=${filtro.operadoraId}`, this.options());
        } else {
            request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}`, this.options());
        }
        return request;
    }
}
