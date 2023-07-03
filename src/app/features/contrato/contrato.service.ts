import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";
import {Contrato} from "../../model/Contrato";

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

    baseURL = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }

    async salvar (contrato: Contrato): Promise<Contrato> {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");

        const request = this.httpClient.post(`${this.baseURL}/contratos`, JSON.stringify(contrato), { headers });

        return firstValueFrom(request).then();
    }
}
