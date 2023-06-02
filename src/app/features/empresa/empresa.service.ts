import {Injectable} from '@angular/core';
import {Constantes} from "../../shared/Constantes";
import {Empresa} from "../../model/Empresa";

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {

    constructor() {
    }

    async todosEstados () {
        return Constantes.estados;
    }

    async salvar(empresa: Empresa): Promise<Empresa> {
        return empresa;
    }
}
