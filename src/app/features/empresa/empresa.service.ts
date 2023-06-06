import {Injectable} from '@angular/core';
import {Constantes} from "../../shared/Constantes";
import {Empresa} from "../../model/Empresa";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
<<<<<<< HEAD
import {environment} from "../../../environments/environment";
=======
>>>>>>> edb696aecfe83406df634a5a440139a9665addf7

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {

<<<<<<< HEAD
    baseURL = environment.apiUrl;
=======
    url = "http://localhost:8081/econcilia/api/contratos"
>>>>>>> edb696aecfe83406df634a5a440139a9665addf7

    constructor(private httpClient: HttpClient) { }

    async todosEstados () {
        return Constantes.estados;
    }

<<<<<<< HEAD
    async buscarDadosCnpj (cnpj: string): Promise<Empresa> {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");

        const request = this.httpClient.get(`${this.baseURL}/cnpj/${cnpj}`, { headers });

        return firstValueFrom(request).then();
    }

=======
>>>>>>> edb696aecfe83406df634a5a440139a9665addf7
    async salvar(empresa: Empresa): Promise<Empresa> {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");

<<<<<<< HEAD
        const request = this.httpClient.post(`${this.baseURL}/empresas`, JSON.stringify(empresa), { headers });
=======
        const request = this.httpClient.post(this.url, {}, { headers });
>>>>>>> edb696aecfe83406df634a5a440139a9665addf7

        return firstValueFrom(request).then();
    }
}
