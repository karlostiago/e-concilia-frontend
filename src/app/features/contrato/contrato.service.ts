import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Contrato} from "../../model/Contrato";
import {AbstractService} from "../../service/AbstractService";
import {ErroHandlerService} from "../../core/ErroHandlerService";

@Injectable({
  providedIn: 'root'
})
export class ContratoService extends AbstractService<Contrato> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    async salvar (contrato: Contrato): Promise<Contrato> {
        const request = this.httpClient.post(`${this.baseURL}/contratos`, JSON.stringify(contrato), this.options());
        return this.toPromise(request);
    }
}
