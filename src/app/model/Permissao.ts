import {Funcionalidade} from "./Funcionalidade";
import {Usuario} from "./Usuario";

export class Permissao {
    id: number;
    usuario = new Usuario();
    funcionalidades = new Array<Funcionalidade>();
}
