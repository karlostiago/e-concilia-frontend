import {Injectable} from '@angular/core';
import {Constantes} from "../../shared/Constantes";
import {Empresa} from "../../model/Empresa";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {

    baseURL = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }

    async todosEstados () {
        return Constantes.estados;
    }

    async buscarDadosCnpj (cnpj: string): Promise<Empresa> {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");

        const request = this.httpClient.get(`${this.baseURL}/cnpj/${cnpj}`, { headers });

        return firstValueFrom(request).then();
    }

    async salvar(empresa: Empresa): Promise<Empresa> {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");

        const request = this.httpClient.post(`${this.baseURL}/empresas`, {}, { headers });

        return firstValueFrom(request).then();
    }
}
