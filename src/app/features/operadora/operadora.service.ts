import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Taxa} from "../../model/Taxa";
import {firstValueFrom} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OperadoraService {

    baseURL = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }

    async validarTaxa (taxa: Taxa): Promise<Taxa> {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");

        const request = this.httpClient.post(`${this.baseURL}/taxas/validar`, JSON.stringify(taxa), { headers });

        return firstValueFrom(request).then();
    }
}
