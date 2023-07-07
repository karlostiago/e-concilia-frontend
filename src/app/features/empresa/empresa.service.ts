import {Injectable} from '@angular/core';
import {Constantes} from "../../shared/Constantes";
import {Empresa} from "../../model/Empresa";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {FiltroEmpresa} from "../../filter/FiltroEmpresa";
import {AbstractService} from "../../service/AbstractService";

@Injectable({
    providedIn: 'root'
})
export class EmpresaService extends AbstractService{

    constructor(private httpClient: HttpClient) {
        super();
    }

    async todosEstados () {
        return Constantes.estados;
    }

    async buscarDadosCnpj (cnpj: string): Promise<Empresa> {
        const request = this.httpClient.get(`${this.baseURL}/cnpj/${cnpj}`, this.options());
        return firstValueFrom(request).then();
    }

    async salvar (empresa: Empresa): Promise<Empresa> {
        const request = this.httpClient.post(`${this.baseURL}/empresas`, JSON.stringify(empresa), this.options());
        return firstValueFrom(request).then();
    }

    async editar (empresa: Empresa): Promise<Empresa> {
        const request = this.httpClient.put(`${this.baseURL}/empresas/${empresa.id}`, JSON.stringify(empresa), this.options());
        return firstValueFrom(request).then();
    }

    async pesquisar (filtroEmpresa: FiltroEmpresa): Promise<Empresa[]> {
        const request = this.httpClient.get(`${this.baseURL}/empresas?cnpj=${filtroEmpresa.cnpj}&razaoSocial=${filtroEmpresa.razaoSocial}`, this.options());
        return firstValueFrom(request).then();
    }

    async excluir (id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/empresas/${id}`, this.options());
        return firstValueFrom(request).then();
    }

    async pesquisarPorId (id: number): Promise<Empresa> {
        const request =this.httpClient.get(`${this.baseURL}/empresas/${id}`, this.options());
        return firstValueFrom(request).then();
    }

    async ativar (id: number): Promise<Empresa> {
        const request =this.httpClient.patch(`${this.baseURL}/empresas/${id}/ativar`, this.options());
        return firstValueFrom(request).then();
    }

    async desativar (id: number): Promise<Empresa> {
        const request =this.httpClient.patch(`${this.baseURL}/empresas/${id}/desativar`, this.options());
        return firstValueFrom(request).then();
    }
}
