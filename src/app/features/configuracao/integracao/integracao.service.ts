import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {Integracao} from "../../../model/Integracao";
import {FiltroConfiguracaoIntegracao} from "../../../filter/FiltroConfiguracaoIntegracao";
import {AbstractService} from "../../../service/AbstractService";
import {SegurancaService} from "../../seguranca/seguranca.service";

@Injectable({
  providedIn: 'root'
})
export class IntegracaoService extends AbstractService<Integracao> {

    constructor(private httpClient: HttpClient,
                protected override segurancaService: SegurancaService,
                protected override error: ErroHandlerService) {
        super(error, segurancaService);
    }

    pathURL() {
        return 'integracoes';
    }

    async salvar (integracao: Integracao): Promise<Integracao> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}`, JSON.stringify(integracao), this.options());
        return this.toPromise(request);
    }

    async pesquisar(filtro: FiltroConfiguracaoIntegracao): Promise<Integracao[]> {
        const request = this.aplicarFiltro(filtro);
        return this.toPromise(request);
    }

    async pesquisarPorId (id: number): Promise<Integracao> {
        const request =this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    async editar (vinculaEmpresaOperadora: Integracao): Promise<Integracao> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${vinculaEmpresaOperadora.id}`, JSON.stringify(vinculaEmpresaOperadora), this.options());
        return this.toPromise(request);
    }

    async excluir (id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    private aplicarFiltro(filtro: FiltroConfiguracaoIntegracao) {
        let request = null;

        if (filtro.codigoIntegracao !== null) {
            return this.httpClient.get(`${this.baseURL}/${this.pathURL()}?codigoIntegracao=${filtro.codigoIntegracao}`, this.options());
        }

        if (filtro.empresaId !== null && filtro.operadoraId != null) {
            request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?empresaId=${filtro.empresaId}&operadoraId=${filtro.operadoraId}`, this.options());
        }
        else if (filtro.empresaId !== null) {
            request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?empresaId=${filtro.empresaId}`, this.options());
        }
        else if (filtro.operadoraId !== null) {
            request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?operadoraId=${filtro.operadoraId}`, this.options());
        }
        else {
            request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}`, this.options());
        }

        return request;
    }
}
