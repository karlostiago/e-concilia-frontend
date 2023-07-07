import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Taxa} from "../../model/Taxa";
import {firstValueFrom} from "rxjs";
import {Operadora} from "../../model/Operadora";
import {FiltroOperadora} from "../../filter/FiltroOperadora";
import {AbstractService} from "../../service/AbstractService";

@Injectable({
    providedIn: 'root'
})
export class OperadoraService extends AbstractService{

    constructor(private httpClient: HttpClient) {
        super();
    }

    async validarTaxa (taxa: Taxa): Promise<Taxa> {
        const request = this.httpClient.post(`${this.baseURL}/taxas/validar`, JSON.stringify(taxa), this.options());
        return firstValueFrom(request).then();
    }

    async pesquisarPorId (id: number): Promise<Operadora> {
        const request =this.httpClient.get(`${this.baseURL}/operadoras/${id}`, this.options());
        return firstValueFrom(request).then();
    }

    async pesquisar (filtro: FiltroOperadora): Promise<Operadora[]> {
        const request = this.httpClient.get(`${this.baseURL}/operadoras?descricao=${filtro.descricao}`, this.options());
        return firstValueFrom(request).then();
    }

    async salvar (operadora: Operadora): Promise<Operadora> {
        const request = this.httpClient.post(`${this.baseURL}/operadoras`, JSON.stringify(operadora), this.options());
        return firstValueFrom(request).then();
    }

    async editar (operadora: Operadora): Promise<Operadora> {
        const request = this.httpClient.put(`${this.baseURL}/operadoras/${operadora.id}`, JSON.stringify(operadora), this.options());
        return firstValueFrom(request).then();
    }

    async excluir (id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/operadoras/${id}`, this.options());
        return firstValueFrom(request).then();
    }
}
