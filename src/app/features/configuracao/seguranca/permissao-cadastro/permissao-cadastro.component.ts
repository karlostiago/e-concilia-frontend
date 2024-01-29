import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../../model/Usuario";
import {UsuarioService} from '../usuario.service';
import {FiltroUsuario} from '../../../../filter/FiltroUsuario';
import {Permissao} from "../../../../model/Permissao";
import {Funcionalidade} from "../../../../model/Funcionalidade";
import {TipoPermissao} from "../../../../model/TipoPermissao";
import {PermissaoService} from "../permissao.service";
import {NotificacaoService} from "../../../../shared/notificacao/notificacao.service";
import {Regra} from "../../../../model/Regra";
import {ActivatedRoute} from "@angular/router";
import {RegraService} from "../regra.service";
import {SegurancaService} from "../../../seguranca/seguranca.service";

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
        private activatedRoute: ActivatedRoute,
        private regraService: RegraService,
        public segurancaService: SegurancaService,
        private permissaoService: PermissaoService) { }

    ngOnInit(): void {
        this.carregarUsuarios();
        this.carregarRegras();

        const usuarioId = this.activatedRoute.snapshot.params['id'];

        if (usuarioId) {
            this.pesquisarPorId(usuarioId);
        }
    }

    pesquisarPorId (id: number) {
        this.permissaoService.pesquisarUsuario(id).then(permissao => {
            this.permissao = permissao;
            this.usuarioId = this.permissao.usuario.id;
            this.regras = this.regraService.buscarPermissao(this.permissao);
            console.log(this.permissao);
        });
    }

    salvarOuEditar() {
        if (this.permissao.id) {
            this.editar();
        } else {
            this.salvar();
        }
    }

    adicionar(regra: Regra, prefixo: string, event: any) {
        let funcionalidade = `${prefixo}_${regra.nome.toUpperCase()}`;
        let salvarOuRemover = event.target.checked;

        if (salvarOuRemover) {
            this.adicionarPermissao(regra.code, funcionalidade);
        } else {
            this.removerPermissao(regra.code, funcionalidade);
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
            [TipoPermissao.MENU]: ['Empresas', 'Contratos', 'Operadoras', 'Usuários', 'Permissões', 'Integrações', 'Taxas', 'Importações', 'Conciliador'],
        };

        const permissoesDoTipo = permissoesPorTipo[tipoPermissao];

        return !permissoesDoTipo.some(p => regra.nome.includes(p));
    }

    limpar() {
        this.permissao = new Permissao();
    }

    private salvar() {
        this.selecionarUsuario();
        this.permissaoService.salvar(this.permissao).then(resposta => {
            this.notificacao.sucesso("Permissão cadastrada com sucesso.");
        });
    }

    private editar() {
        this.permissaoService.editar(this.permissao).then(resposta => {
            this.notificacao.sucesso("Permissão atualizada com sucesso.");
        });
    }

    private selecionarUsuario () {
        const usuarios = this.usuarios.filter(usuario => usuario.id === this.usuarioId);
        if (usuarios.length === 1) {
            this.permissao.usuario = usuarios[0];
        }
    }

    private removerPermissao(codigo: number, permissao: string) {
        const tipoPermissoes = permissao.split("_");
        const funcionalidade = this.permissao.funcionalidades.filter(funcionalidade => {
            return funcionalidade.codigo === codigo && (funcionalidade.permissao === permissao || funcionalidade.permissao === tipoPermissoes[0]);
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
        this.regras = this.regraService.getRegras();
    }

    protected readonly TipoPermissao = TipoPermissao;
}
