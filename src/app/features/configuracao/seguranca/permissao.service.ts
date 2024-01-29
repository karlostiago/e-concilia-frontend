import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {AbstractService} from "../../../service/AbstractService";
import {Permissao} from "../../../model/Permissao";

@Injectable({
    providedIn: 'root'
})
export class PermissaoService extends AbstractService<Permissao> {

    constructor(private httpClient: HttpClient,
                protected override error: ErroHandlerService) {
        super(error);
    }

    pathURL() {
        return 'permissoes';
    }

    async salvar(permissao: Permissao): Promise<Permissao> {
        const request = this.httpClient.post(`${this.baseURL}/${this.pathURL()}`, JSON.stringify(permissao), this.options());
        return this.toPromise(request);
    }

    async pesquisarUsuario(usuarioId: number): Promise<Permissao> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}/${usuarioId}/usuario`, this.options());
        return this.toPromise(request);
    }


    async editar(permissao: Permissao): Promise<Permissao> {
        const request = this.httpClient.put(`${this.baseURL}/${this.pathURL()}/${permissao.id}`, JSON.stringify(permissao), this.options());
        return this.toPromise(request);
    }

    async pesquisar(nomeCompleto: string, tipoPermissao: string): Promise<Array<Permissao>> {
        const request = this.httpClient.get(`${this.baseURL}/${this.pathURL()}?nomeCompleto=${nomeCompleto}&tipoPermissao=${tipoPermissao}`, this.options());
        return this.toPromise(request);
    }

    async excluir(id: number) {
        const request = this.httpClient.delete(`${this.baseURL}/${this.pathURL()}/${id}`, this.options());
        return this.toPromise(request);
    }
}
