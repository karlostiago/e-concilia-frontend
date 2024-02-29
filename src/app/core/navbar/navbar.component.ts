import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NavbarService} from "../../shared/navbar/navbar.service";
import {SegurancaService} from "../../features/seguranca/seguranca.service";
import {DataHelpers} from "../../../helpers/DataHelpers";
import {
    ConsultaNotificacaoComponent
} from "../../features/notificacao/notificacao-consulta/consulta-notificacao.component";
import {AlertaService} from "../../shared/alerta/alerta.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    hora: string;
    usuario: string;
    exibirMenu = false;
    exibirMenuConciliadores = false;
    exibirMenuConfiguracoes = false;
    menuPrincipal = true;

    visivel: boolean;

    quantidadeNotificacoes: number;

    travarResolucao: boolean;

    @ViewChild(ConsultaNotificacaoComponent) notificacaoComponent: ConsultaNotificacaoComponent;

    constructor(private navbarService: NavbarService,
                private alerta: AlertaService,
                private render: Renderer2,
                public segurancaService: SegurancaService) {
        this.fecharMenu();
    }

    ngOnInit(): void {
        this.analisaResolucaoTela();
        this.carregarNomeUsuario();
        this.atualizarRelogio();

        setInterval(() => {
            this.atualizarRelogio();
        }, 1000);
    }

    dataCorrente() {
        return DataHelpers.formatPtBr(new Date());
    }

    atualizarRelogio() {
        const data = new Date();
        this.hora = `${this.adicionarZero(data.getHours())}:${this.adicionarZero(data.getMinutes())}:${this.adicionarZero(data.getSeconds())}`;
    }

    fecharMenu() {
        this.exibirMenu = !this.exibirMenu;
        this.navbarService.setData(this.exibirMenu);
    }

    menuConciliadores(e: Event) {
        e.preventDefault();
        this.menuPrincipal = !this.menuPrincipal;
        this.exibirMenuConciliadores = !this.exibirMenuConciliadores;
    }

    menuConfiguracoes(e: Event) {
        e.preventDefault();
        this.menuPrincipal = !this.menuPrincipal;
        this.exibirMenuConfiguracoes = !this.exibirMenuConfiguracoes;
    }

    temAcessoMenuConfiguracao() {
        return this.segurancaService.temPermissao('ROLE_MENU_INTEGRACAO')
            || this.segurancaService.temPermissao('ROLE_MENU_USUARIO')
            || this.segurancaService.temPermissao('ROLE_MENU_PERMISSAO')
            || this.segurancaService.temPermissao('ROLE_PESQUISAR_IMPORTACAO');
    }

    notificacoesDialog() {
        if (this.quantidadeNotificacoes === 0) {
            this.alerta.sucesso('Parabéns, todas as notificações já foram lidas.')
            return;
        }
        this.visivel = !this.visivel;
        this.carregarNotificacoes();
    }

    atualizarNotificacoes(quantidade: number) {
        this.quantidadeNotificacoes = quantidade;
    }

    private carregarNotificacoes() {
        this.notificacaoComponent.pesquisar();
    }

    private carregarNomeUsuario() {
        if (this.segurancaService.getUsuario()) {
            const user = this.segurancaService.getUsuario().nomeCompleto;
            const nomes = user.split(" ");
            if (nomes.length > 1) {
                this.usuario = `${nomes[0]} ${nomes[1].charAt(0).toUpperCase()}`;
            } else {
                this.usuario = `${nomes[0]}`;
            }
        } else {
            this.usuario = "ECONCILIA";
        }
    }

    private adicionarZero(numero: number): string {
        return numero < 10 ? `0${numero}` : `${numero}`;
    }

    private analisaResolucaoTela() {
        this.travarResolucao = false;
        this.atualizaTamanhoTela();

        this.render.listen('window', 'resize', (e) => {
            this.atualizaTamanhoTela();
        });
    }

    private getResolucaoTela(): {largura: number, altura: number} {
        const largura = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const altura = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return { largura, altura };
    }

    private atualizaTamanhoTela(): void {
        const resolucaoTela = this.getResolucaoTela();
        if (resolucaoTela.largura < 500 && !this.travarResolucao) {
            this.fecharMenu();
            this.travarResolucao = true;
        }
    }
}
