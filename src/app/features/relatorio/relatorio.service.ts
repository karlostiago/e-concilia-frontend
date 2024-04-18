import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../core/ErroHandlerService";
import {AbstractService} from "../../service/AbstractService";
import {Relatorio} from "../../model/Relatorio";

@Injectable({
  providedIn: 'root'
})
export class RelatorioService extends AbstractService<Relatorio> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    pathURL() {
        return 'relatorios';
    }

    async buscarVendas() {

    }

    async buscarTaxas() {

    }

    async buscarConciliacao() {

    }
}
