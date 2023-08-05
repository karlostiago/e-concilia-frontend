import {Injectable} from '@angular/core';
import {Constantes} from "../../shared/Constantes";
import {Empresa} from "../../model/Empresa";
import {HttpClient} from "@angular/common/http";
import {FiltroEmpresa} from "../../filter/FiltroEmpresa";
import {AbstractService} from "../../service/AbstractService";
import {ErroHandlerService} from "../../core/ErroHandlerService";

@Injectable({
    providedIn: 'root'
})
export class EmpresaService extends AbstractService<Empresa> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    async todosEstados () {
        return Constantes.estados;
    }

    async buscarDadosCnpj (cnpj: string): Promise<Empresa> {
        const request = this.httpClient.get(`${this.baseURL}/cnpj/${cnpj}`, this.options());
        return this.toPromise(request);
    }

    async salvar (empresa: Empresa): Promise<Empresa> {
        const request = this.httpClient.post(`${this.baseURL}/empresas`, JSON.stringify(empresa), this.options());
        return this.toPromise(request);
    }

    async editar (empresa: Empresa): Promise<Empresa> {
        const request = this.httpClient.put(`${this.baseURL}/empresas/${empresa.id}`, JSON.stringify(empresa), this.options());
        return this.toPromise(request);
    }

    async pesquisar (filtroEmpresa: FiltroEmpresa): Promise<Empresa[]> {
        const request = this.httpClient.get(`${this.baseURL}/empresas?cnpj=${filtroEmpresa.cnpj}&razaoSocial=${filtroEmpresa.razaoSocial}`, this.options());
        return this.toPromise(request);
    }

    async excluir (id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/empresas/${id}`, this.options());
        return this.toPromise(request);
    }

    async pesquisarPorId (id: number): Promise<Empresa> {
        const request =this.httpClient.get(`${this.baseURL}/empresas/${id}`, this.options());
        return this.toPromise(request);
    }

    async ativar (id: number): Promise<Empresa> {
        const request =this.httpClient.patch(`${this.baseURL}/empresas/${id}/ativar`, this.options());
        return this.toPromise(request);
    }

    async desativar (id: number): Promise<Empresa> {
        const request =this.httpClient.patch(`${this.baseURL}/empresas/${id}/desativar`, this.options());
        return this.toPromise(request);
    }
}
