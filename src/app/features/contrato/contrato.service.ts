import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Contrato} from "../../model/Contrato";
import {AbstractService} from "../../service/AbstractService";

@Injectable({
  providedIn: 'root'
})
export class ContratoService extends AbstractService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    async salvar (contrato: Contrato): Promise<Contrato> {
        const request = this.httpClient.post(`${this.baseURL}/contratos`, JSON.stringify(contrato), this.options());
        return firstValueFrom(request).then();
    }
}
