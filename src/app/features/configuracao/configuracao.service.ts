import {Injectable} from '@angular/core';
import {AbstractService} from "../../service/AbstractService";
import {VinculaEmpresaOperadora} from "../../model/VinculaEmpresaOperadora";
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {FiltroContrato} from "../../filter/FiltroContrato";
import {FiltroConfiguracaoIntegracao} from "../../filter/FiltroConfiguracaoIntegracao";
import {Empresa} from "../../model/Empresa";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService extends AbstractService<VinculaEmpresaOperadora> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    async vincularEmpresaOperadora (vinculaEmpresaOperadora: VinculaEmpresaOperadora): Promise<VinculaEmpresaOperadora> {
        const request = this.httpClient.post(`${this.baseURL}/configuracao/vincula-empresa-operadora`, JSON.stringify(vinculaEmpresaOperadora), this.options());
        return this.toPromise(request);
    }

    async pesquisarConfiguracoesVinculoEmpresaOperadora(filtro: FiltroConfiguracaoIntegracao): Promise<VinculaEmpresaOperadora[]> {
        const request = this.aplicarFiltro(filtro);
        return this.toPromise(request);
    }

    async pesquisarPorId (id: number): Promise<VinculaEmpresaOperadora> {
        const request =this.httpClient.get(`${this.baseURL}/configuracao/vincula-empresa-operadora/${id}`, this.options());
        return this.toPromise(request);
    }

    async editar (vinculaEmpresaOperadora: VinculaEmpresaOperadora): Promise<VinculaEmpresaOperadora> {
        const request = this.httpClient.put(`${this.baseURL}/configuracao/vincula-empresa-operadora/${vinculaEmpresaOperadora.id}`, JSON.stringify(vinculaEmpresaOperadora), this.options());
        return this.toPromise(request);
    }

    async excluir (id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/configuracao/vincula-empresa-operadora/${id}`, this.options());
        return this.toPromise(request);
    }

    private aplicarFiltro(filtro: FiltroConfiguracaoIntegracao) {
        let request = null;

        if (filtro.codigoIntegracao !== null) {
            return this.httpClient.get(`${this.baseURL}/configuracao/vincula-empresa-operadora?codigoIntegracao=${filtro.codigoIntegracao}`, this.options());
        }

        if (filtro.empresaId !== null && filtro.operadoraId != null) {
            request = this.httpClient.get(`${this.baseURL}/configuracao/vincula-empresa-operadora?empresaId=${filtro.empresaId}&operadoraId=${filtro.operadoraId}`, this.options());
        }
        else if (filtro.empresaId !== null) {
            request = this.httpClient.get(`${this.baseURL}/configuracao/vincula-empresa-operadora?empresaId=${filtro.empresaId}`, this.options());
        }
        else if (filtro.operadoraId !== null) {
            request = this.httpClient.get(`${this.baseURL}/configuracao/vincula-empresa-operadora?operadoraId=${filtro.operadoraId}`, this.options());
        }
        else {
            request = this.httpClient.get(`${this.baseURL}/configuracao/vincula-empresa-operadora`, this.options());
        }

        return request;
    }
}
