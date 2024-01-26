import {environment} from "../../environments/environment";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ErroHandlerService} from "../core/ErroHandlerService";
import {SegurancaService} from "../features/seguranca/seguranca.service";

export abstract class AbstractService<T> {

    protected baseURL =  environment.apiUrl;

    protected constructor(
        protected error: ErroHandlerService) { }

    protected abstract pathURL(): string;

    options (httpParams: HttpParams = new HttpParams()) {
        return {
            headers: this.headers(),
            httpParams
        }
    }

    headers (): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        return headers;
    }

    toPromise <T> (request: Observable<Object>): Promise <T> {
        return new Promise((resolve) => {
            request.subscribe({
                next: (data) => {
                    resolve(data as T);
                },
                error: (error) => {
                    this.error.capturar(error);
                }
            })
        })
    }
}
