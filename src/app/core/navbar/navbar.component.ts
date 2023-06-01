import {Component, OnInit} from '@angular/core';
import {PaginaNavbar} from "../enums/PaginaNavbar";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    protected readonly PaginaNavbar = PaginaNavbar;

    exibirMenuLateral = false;

    titulo = "";

    ngOnInit(): void {
        this.titulo = "/" + PaginaNavbar.INICIAL;
    }

    atualizarTitulo (pagina: PaginaNavbar, e: Event) {
        e.defaultPrevented;
        this.titulo = "/" + PaginaNavbar.INICIAL;

        if (pagina !== PaginaNavbar.INICIAL) {
            this.titulo = `/Tela de ${pagina}`
        }

        this.exibirMenuLateral = false;
    }

}
