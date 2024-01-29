import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {SegurancaService} from "./features/seguranca/seguranca.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private segurancaService: SegurancaService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Basic ${this.segurancaService.getToken()}`
            }
        });
        return next.handle(req);
    }

}
