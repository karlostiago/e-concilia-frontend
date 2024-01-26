import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../shared/navbar/navbar.service";
import {SegurancaService} from "../../features/seguranca/seguranca.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    exibirMenu = false;
    exibirMenuConciliadores = false;
    exibirMenuConfiguracoes = false;
    menuPrincipal = true;

    constructor(private navbarService: NavbarService,
                public segurancaService: SegurancaService) {
        this.fecharMenu();
    }

    ngOnInit(): void {

    }

    fecharMenu () {
        this.exibirMenu = !this.exibirMenu;
        this.navbarService.setData(this.exibirMenu);
    }

    menuConciliadores (e: Event) {
        e.preventDefault();
        this.menuPrincipal = !this.menuPrincipal;
        this.exibirMenuConciliadores = !this.exibirMenuConciliadores;
    }

    menuConfiguracoes (e: Event) {
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
}
