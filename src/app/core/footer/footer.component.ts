import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {NavbarService} from "../../shared/navbar/navbar.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    ambiente = "Desenvolvimento";
    exibirMenu = false;

    constructor(private navbarService: NavbarService) {
        this.navbarService.data$.subscribe(data => {
            this.exibirMenu = data;
        });
    }

    ngOnInit(): void {
        if (environment.production) {
            this.ambiente = "Produção";
        }
    }
}
