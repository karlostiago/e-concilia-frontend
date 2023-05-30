import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    exibirMenuLateral = false;

    titulo = "";

    ngOnInit(): void {
        this.titulo = "/Tela Inicial";
    }

    atualizarTitulo (tituloNovo: string, e: Event) {
        e.defaultPrevented;
        this.titulo = "/Tela Inicial"

        if (tituloNovo.length !== 0) {
            this.titulo = `/Tela de ${this.retornaPrimeiraLetraMaiusculo(tituloNovo).concat(this.retornaPalavraSemPrimeiraLetra(tituloNovo))}`;
        }

        this.exibirMenuLateral = false;
    }

    private retornaPrimeiraLetraMaiusculo(str: string) {
        return str.charAt(0).toUpperCase();
    }

    private retornaPalavraSemPrimeiraLetra(str: string) {
        return str.substring(1, str.length);
    }
}
