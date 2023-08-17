import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Contrato} from "../../model/Contrato";
import {AbstractService} from "../../service/AbstractService";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {FiltroContrato} from "../../filter/FiltroContrato";
import {Empresa} from "../../model/Empresa";

@Injectable({
  providedIn: 'root'
})
export class ContratoService extends AbstractService<Contrato> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    async salvar (contrato: Contrato): Promise<Contrato> {
        const request = this.httpClient.post(`${this.baseURL}/contratos`, JSON.stringify(contrato), this.options());
        return this.toPromise(request);
    }

    async editar (contrato: Contrato): Promise<Contrato> {
        const request = this.httpClient.put(`${this.baseURL}/contratos/${contrato.numero}`, JSON.stringify(contrato), this.options());
        return this.toPromise(request);
    }

    async excluir (id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/contratos/${id}`, this.options());
        return this.toPromise(request);
    }

    async pesquisarPorId (id: number): Promise<Contrato> {
        const request =this.httpClient.get(`${this.baseURL}/contratos/${id}`, this.options());
        return this.toPromise(request);
    }

    async pesquisar(filtro: FiltroContrato): Promise<Contrato[]> {

        let request = null;

        if (filtro.empresaId !== null && filtro.operadoraId != null) {
            request = this.httpClient.get(`${this.baseURL}/contratos?empresaId=${filtro.empresaId}&operadoraId=${filtro.operadoraId}`, this.options());
        }
        else if (filtro.empresaId !== null) {
            request = this.httpClient.get(`${this.baseURL}/contratos?empresaId=${filtro.empresaId}`, this.options());
        }
        else if (filtro.operadoraId !== null) {
            request = this.httpClient.get(`${this.baseURL}/contratos?operadoraId=${filtro.operadoraId}`, this.options());
        }
        else {
            request = this.httpClient.get(`${this.baseURL}/contratos`, this.options());
        }

        return this.toPromise(request);
    }
}
