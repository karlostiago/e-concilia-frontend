import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../../model/Usuario";
import { UsuarioService } from '../usuario.service';
import { FiltroUsuario } from '../../../../filter/FiltroUsuario';
import {Permissao} from "../../../../model/Permissao";
import {Funcionalidade} from "../../../../model/Funcionalidade";
import {TipoPermissao} from "../../../../model/TipoPermissao";
import {PermissaoService} from "../permissao.service";
import {NotificacaoService} from "../../../../shared/notificacao/notificacao.service";
import {Regra} from "../../../../model/Regra";

@Component({
  selector: 'app-permissao-cadastro',
  templateUrl: './permissao-cadastro.component.html',
  styleUrls: ['./permissao-cadastro.component.css']
})
export class PermissaoCadastroComponent implements OnInit {

    usuarios: Usuario[]
    usuarioId: number;

    regras = new Array<Regra>();
    permissao = new Permissao();

    constructor(
        private usuarioService: UsuarioService,
        private notificacao: NotificacaoService,
        private permissaoService: PermissaoService) { }

    ngOnInit(): void {
        this.carregarUsuarios();
        this.carregarRegras();
    }

    salvar() {
        this.selecionarUsuario();

        console.log(this.permissao);

        this.permissaoService.salvar(this.permissao).then(resposta => {
            this.notificacao.sucesso("Permissão cadastrada com sucesso.");
        });
    }

    adicionar(regra: Regra, prefixo: string, event: any) {

        let funcionalidade = `${prefixo}_${regra.nome.toUpperCase()}`;
        let salvarOuRemover = event.checked;

        if (salvarOuRemover) {
            this.adicionarPermissao(regra.code, funcionalidade);
        } else {
            this.removerPermissao(funcionalidade);
        }
    }

    naoBloquear(regra: Regra, tipoPermissao: TipoPermissao) {
        const permissoesPorTipo: Record<TipoPermissao, string[]> = {
            [TipoPermissao.AGENDAR]: ['Importações'],
            [TipoPermissao.CADASTRAR]: ['Empresas', 'Contratos', 'Operadoras', 'Usuários', 'Permissões', 'Integrações'],
            [TipoPermissao.ATUALIZAR]: ['Empresas', 'Contratos', 'Operadoras', 'Usuários', 'Permissões', 'Integrações'],
            [TipoPermissao.PESQUISAR]: ['Empresas', 'Contratos', 'Operadoras', 'Usuários', 'Permissões', 'Conciliador', 'Integrações', 'Taxas', 'Dashboard'],
            [TipoPermissao.DELETAR]: ['Empresas', 'Contratos', 'Operadoras', 'Usuários', 'Permissões', 'Integrações'],
            [TipoPermissao.ATIVAR]: ['Empresas', 'Contratos', 'Taxas'],
        };

        const permissoesDoTipo = permissoesPorTipo[tipoPermissao];

        return !permissoesDoTipo.some(p => regra.nome.includes(p));
    }

    private selecionarUsuario () {
        const usuarios = this.usuarios.filter(usuario => usuario.id === this.usuarioId);
        if (usuarios.length === 1) {
            this.permissao.usuario = usuarios[0];
        }
    }

    private removerPermissao(permissao: string) {
        const funcionalidade = this.permissao.funcionalidades.filter(funcionalidade => {
            return funcionalidade.permissao === permissao
        })[0];

        const index = this.permissao.funcionalidades.indexOf(funcionalidade);
        if (index >= 0)
            this.permissao.funcionalidades.splice(index, 1);
    }

    private adicionarPermissao(codigo: number, descricao: string) {
        if (descricao.length === 0) return;

        const funcionalidade = new Funcionalidade();

        funcionalidade.codigo = codigo;
        funcionalidade.permissao = descricao.toUpperCase();

        const temFuncionalidade = this.permissao.funcionalidades.some(f => {
            return f.permissao === funcionalidade.permissao
        });

        if (!temFuncionalidade)
            this.permissao.funcionalidades.push(funcionalidade);

    }

    private carregarUsuarios () {
        this.usuarioService.pesquisar(new FiltroUsuario()).then(usuarios => {
            this.usuarios = usuarios;
        });
    }

    private carregarRegras() {
        this.regras = [
            { code: 1, nome: 'Dashboard', agendar: false, cadastrar: false, atualizar: false, pesquisar: false, deletar: false, ativar: false },
            { code: 2, nome: 'Empresas', agendar: false, cadastrar: false, atualizar: false, pesquisar: false, deletar: false, ativar: false },
            { code: 3, nome: 'Contratos', agendar: false, cadastrar: false, atualizar: false, pesquisar: false, deletar: false, ativar: false },
            { code: 4, nome: 'Operadoras', agendar: false, cadastrar: false, atualizar: false, pesquisar: false, deletar: false, ativar: false },
            { code: 5, nome: 'Taxas', agendar: false, cadastrar: false, atualizar: false, pesquisar: false, deletar: false, ativar: false },
            { code: 7, nome: 'Integrações', agendar: false, cadastrar: false, atualizar: false, pesquisar: false, deletar: false, ativar: false },
            { code: 8, nome: 'Usuários', agendar: false, cadastrar: false, atualizar: false, pesquisar: false, deletar: false, ativar: false },
            { code: 9, nome: 'Permissões', agendar: false, cadastrar: false, atualizar: false, pesquisar: false, deletar: false, ativar: false },
            { code: 10, nome: 'Importações', agendar: false, cadastrar: false, atualizar: false, pesquisar: false, deletar: false, ativar: false },
            { code: 6, nome: 'Conciliador ifood', agendar: false, cadastrar: false, atualizar: false, pesquisar: false, deletar: false, ativar: false },
        ];
    }

    protected readonly TipoPermissao = TipoPermissao;
}
