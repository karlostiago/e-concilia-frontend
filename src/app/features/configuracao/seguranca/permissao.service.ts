import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {AbstractService} from "../../../service/AbstractService";
import {Usuario} from "../../../model/Usuario";
import {FiltroUsuario} from "../../../filter/FiltroUsuario";
import {SegurancaService} from "../../seguranca/seguranca.service";
import {Permissao} from "../../../model/Permissao";

@Injectable({
  providedIn: 'root'
})
export class PermissaoService extends AbstractService<Permissao> {

    constructor(private httpClient: HttpClient,
                protected override segurancaService: SegurancaService,
                protected override error: ErroHandlerService) {
        super(error, segurancaService);
    }

    pathURL() {
        return 'permissoes';
    }

    async salvar (permissao: Permissao): Promise<Permissao> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}`, JSON.stringify(permissao), this.options());
        return this.toPromise(request);
    }
    /*
    async pesquisarPorId (id: number): Promise<Usuario> {
        const request =this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }

    async editar (usuario: Usuario): Promise<Usuario> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${usuario.id}`, JSON.stringify(usuario), this.options());
        return this.toPromise(request);
    }

    async pesquisar (filtroUsuario: FiltroUsuario): Promise<Usuario[]> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?nomeCompleto=${filtroUsuario.nomeCompleto}&email=${filtroUsuario.email}`, this.options());
        return this.toPromise(request);
    }

    async excluir (id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }
     */
}
