import {environment} from "../../environments/environment";
import {HttpHeaders, HttpParams} from "@angular/common/http";

export abstract class AbstractService {

    protected baseURL =  environment.apiUrl;

    protected constructor() { }

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
}
