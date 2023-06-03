import {Injectable} from '@angular/core';
import {Constantes} from "../../shared/Constantes";
import {Empresa} from "../../model/Empresa";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {

    url = "http://localhost:8081/econcilia/api/contratos"

    constructor(private httpClient: HttpClient) { }

    async todosEstados () {
        return Constantes.estados;
    }

    async salvar(empresa: Empresa): Promise<Empresa> {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");

        const request = this.httpClient.post(this.url, {}, { headers });

        return firstValueFrom(request).then();
    }
}
