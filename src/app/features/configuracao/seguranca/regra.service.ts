import {Injectable} from '@angular/core';
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {AbstractService} from "../../../service/AbstractService";
import {Regra} from "../../../model/Regra";
import {Permissao} from "../../../model/Permissao";

@Injectable({
    providedIn: 'root'
})
export class RegraService extends AbstractService<Regra> {

    constructor(protected override error: ErroHandlerService) {
        super(error);
    }

    pathURL() {
        return '';
    }

    buscarPermissao(permissao: Permissao): Array<Regra> {
        const regras = this.getRegras();

        for (const funcionalidade of permissao.funcionalidades) {
            const regra = regras.filter(regra => regra.code === funcionalidade.codigo)[0];

            switch (funcionalidade.permissao) {
                case 'CADASTRAR':
                    regra.cadastrar = true;
                    break;
                case 'PESQUISAR':
                    regra.pesquisar = true;
                    break;
                case 'ATUALIZAR':
                    regra.atualizar = true;
                    break;
                case 'ATIVAR':
                    regra.ativar = true;
                    break;
                case 'DELETAR':
                    regra.deletar = true;
                    break;
                case 'AGENDAR':
                    regra.agendar = true;
                    break;
                case 'MENU':
                    regra.menu = true;
                    break;
            }
        }

        return regras;
    }

    getRegras(): Array<Regra> {
        return [
            {
                code: 1,
                nome: 'Dashboard',
                agendar: false,
                cadastrar: false,
                atualizar: false,
                pesquisar: false,
                deletar: false,
                ativar: false,
                menu: false
            },
            {
                code: 2,
                nome: 'Empresas',
                agendar: false,
                cadastrar: false,
                atualizar: false,
                pesquisar: false,
                deletar: false,
                ativar: false,
                menu: false
            },
            {
                code: 3,
                nome: 'Contratos',
                agendar: false,
                cadastrar: false,
                atualizar: false,
                pesquisar: false,
                deletar: false,
                ativar: false,
                menu: false
            },
            {
                code: 4,
                nome: 'Operadoras',
                agendar: false,
                cadastrar: false,
                atualizar: false,
                pesquisar: false,
                deletar: false,
                ativar: false,
                menu: false
            },
            {
                code: 5,
                nome: 'Taxas',
                agendar: false,
                cadastrar: false,
                atualizar: false,
                pesquisar: false,
                deletar: false,
                ativar: false,
                menu: false
            },
            {
                code: 7,
                nome: 'Integrações',
                agendar: false,
                cadastrar: false,
                atualizar: false,
                pesquisar: false,
                deletar: false,
                ativar: false,
                menu: false
            },
            {
                code: 8,
                nome: 'Usuários',
                agendar: false,
                cadastrar: false,
                atualizar: false,
                pesquisar: false,
                deletar: false,
                ativar: false,
                menu: false
            },
            {
                code: 9,
                nome: 'Permissões',
                agendar: false,
                cadastrar: false,
                atualizar: false,
                pesquisar: false,
                deletar: false,
                ativar: false,
                menu: false
            },
            {
                code: 10,
                nome: 'Importações',
                agendar: false,
                cadastrar: false,
                atualizar: false,
                pesquisar: false,
                deletar: false,
                ativar: false,
                menu: false
            },
            {
                code: 6,
                nome: 'Conciliador ifood',
                agendar: false,
                cadastrar: false,
                atualizar: false,
                pesquisar: false,
                deletar: false,
                ativar: false,
                menu: false
            },
        ]
    }
}
