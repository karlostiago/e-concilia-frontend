import {Funcionalidade} from "./Funcionalidade";
import {Usuario} from "./Usuario";

export class Permissao {
    usuario = new Usuario();
    funcionalidades = new Array<Funcionalidade>();
}
