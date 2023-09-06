import { Injectable } from '@angular/core';
import {Conciliador} from "../../model/Conciliador";
import {Endereco} from "../../model/Endereco";
import {Contato} from "../../model/Contato";

@Injectable({
  providedIn: 'root'
})
export class ConciliadorService {

    constructor() { }

    async buscarVendas(): Promise<Conciliador[]> {
        return [
            {
                dataVenda: new Date(),
                empresa: this.novaEmpresa(1, 'COMETA SUPERMERCADOS LTDA'),
                produto: this.novoProduto(1, 'ELO CREDITO', 15.99, 1.49),
                taxaPrevista: 1.25,
                valorDiferenca: .24,
                conciliado: false
            },
            {
                dataVenda: new Date(),
                empresa: this.novaEmpresa(2, 'COMETA SUPERMERCADOS LTDA'),
                produto: this.novoProduto(2, 'ELO CREDITO', 5.99, .49),
                taxaPrevista: .49,
                valorDiferenca: 0,
                conciliado: true
            }
        ];
    }

    private novaEmpresa(id: number, razaoSocial: string) {
        return {
            id: id,
            razaoSocial: razaoSocial,
            nomeFantasia: razaoSocial,
            cnpj: '00000000000000',
            endereco:  new Endereco(),
            contato: new Contato(),
            ativo: false
        }
    }

    private novoProduto(id: number, descricao: string, valor: number, taxa: number) {
        return {
            id: id,
            descricao: descricao,
            valor: valor,
            taxa: taxa
        }
    }
}
