import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {

    constructor() {
    }

    async todosEstados () {
        return [
            { uf: "AC", codigo: 1 },
            { uf: "AL", codigo: 2 },
            { uf: "AP", codigo: 3 },
            { uf: "AM", codigo: 4 },
            { uf: "BA", codigo: 5 },
            { uf: "CE", codigo: 6 },
            { uf: "DF", codigo: 7 },
            { uf: "ES", codigo: 8 },
            { uf: "GO", codigo: 9 },
            { uf: "MA", codigo: 10 },
            { uf: "MT", codigo: 11 },
            { uf: "MS", codigo: 12 },
            { uf: "MG", codigo: 13 },
            { uf: "PA", codigo: 14 },
            { uf: "PB", codigo: 15 },
            { uf: "PR", codigo: 16 },
            { uf: "PE", codigo: 17 },
            { uf: "PI", codigo: 18 },
            { uf: "RJ", codigo: 19 },
            { uf: "RN", codigo: 20 },
            { uf: "RS", codigo: 21 },
            { uf: "RO", codigo: 22 },
            { uf: "RR", codigo: 23 },
            { uf: "SC", codigo: 24 },
            { uf: "SP", codigo: 25 },
            { uf: "SE", codigo: 26 },
            { uf: "TO", codigo: 27 }
        ];
    }
}
