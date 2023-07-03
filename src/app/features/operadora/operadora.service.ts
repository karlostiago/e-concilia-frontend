import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Taxa} from "../../model/Taxa";
import {firstValueFrom} from "rxjs";
import {Operadora} from "../../model/Operadora";
import {FiltroOperadora} from "../../filter/FiltroOperadora";

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

    async pesquisarPorId (id: number): Promise<Operadora> {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");

        const request =this.httpClient.get(`${this.baseURL}/operadoras/${id}`, { headers });

        return firstValueFrom(request).then();
    }

    async pesquisar (filtro: FiltroOperadora): Promise<Operadora[]> {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");

        const request = this.httpClient.get(`${this.baseURL}/operadoras?descricao=${filtro.descricao}`, { headers });

        return firstValueFrom(request).then();
    }

    async salvar (operadora: Operadora): Promise<Operadora> {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");

        const request = this.httpClient.post(`${this.baseURL}/operadoras`, JSON.stringify(operadora), { headers });

        return firstValueFrom(request).then();
    }

    async editar (operadora: Operadora): Promise<Operadora> {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");

        const request = this.httpClient.put(`${this.baseURL}/operadoras/${operadora.id}`, JSON.stringify(operadora), { headers });

        return firstValueFrom(request).then();
    }

    async excluir (id: number) {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");

        const request = this.httpClient.delete(`${this.baseURL}/operadoras/${id}`, { headers });

        return firstValueFrom(request).then();
    }
}
