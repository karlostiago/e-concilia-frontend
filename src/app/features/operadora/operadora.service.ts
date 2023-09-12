import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Taxa} from "../../model/Taxa";
import {catchError, firstValueFrom, map, Observable, Subscription, tap} from "rxjs";
import {Operadora} from "../../model/Operadora";
import {FiltroOperadora} from "../../filter/FiltroOperadora";
import {AbstractService} from "../../service/AbstractService";
import {ErroHandlerService} from "../../core/ErroHandlerService";

@Injectable({
    providedIn: 'root'
})
export class OperadoraService extends AbstractService<Operadora> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    pathURL() {
        return 'operadoras';
    }

    async pesquisarPorId (id: number): Promise<Operadora> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    async pesquisar (filtro: FiltroOperadora): Promise<Operadora[]> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?descricao=${filtro.descricao}`, this.options());
        return this.toPromise(request);
    }

    async salvar (operadora: Operadora): Promise<Operadora> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}`, JSON.stringify(operadora), this.options());
        return this.toPromise(request);
    }

    async editar (operadora: Operadora): Promise<Operadora> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${operadora.id}`, JSON.stringify(operadora), this.options());
        return this.toPromise(request);
    }

    async excluir (id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }
}
