import {Injectable} from '@angular/core';
import {AbstractService} from "../../../service/AbstractService";
import {Parametro} from "../../../model/Parametro";
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../../core/ErroHandlerService";

@Injectable({
  providedIn: 'root'
})
export class ParametroService extends AbstractService<Parametro> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    pathURL() {
        return 'parametros';
    }

    pesquisar(empresaId: number | null, operadoraId: number | null): Promise<Array<Parametro>> {
        if (empresaId === null) {
            empresaId = -1;
        }
        if (operadoraId === null) {
            operadoraId = -1;
        }

        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?empresaId=${empresaId}&operadoraId=${operadoraId}`, this.options());
        return this.toPromise(request);
    }

    salvar(parametro: Parametro): Promise<Parametro> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}`, JSON.stringify(parametro), this.options());
        return this.toPromise(request);
    }
}
