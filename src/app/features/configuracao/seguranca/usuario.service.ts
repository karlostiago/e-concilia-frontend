import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {AbstractService} from "../../../service/AbstractService";
import {Usuario} from "../../../model/Usuario";
import {Empresa} from "../../../model/Empresa";
import {FiltroEmpresa} from "../../../filter/FiltroEmpresa";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends AbstractService<Usuario> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    pathURL() {
        return 'usuarios';
    }

    async salvar (usuario: Usuario): Promise<Usuario> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}`, JSON.stringify(usuario), this.options());
        return this.toPromise(request);
    }

    async pesquisarPorId (id: number): Promise<Usuario> {
        const request =this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    async editar (usuario: Usuario): Promise<Usuario> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${usuario.id}`, JSON.stringify(usuario), this.options());
        return this.toPromise(request);
    }

    async pesquisar (filtroEmpresa: FiltroEmpresa): Promise<Empresa[]> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?cnpj=${filtroEmpresa.cnpj}&razaoSocial=${filtroEmpresa.razaoSocial}`, this.options());
        return this.toPromise(request);
    }
}
