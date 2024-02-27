import {Component, OnInit} from '@angular/core';
import {SegurancaService} from "../seguranca.service";
import {AlertaService} from "../../../shared/alerta/alerta.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email: string;
    senha: string;

    constructor(
        private segurancaService: SegurancaService,
        private alerta: AlertaService,
        private router: Router) {
    }

    ngOnInit(): void {
        // this.email = 'econcilia'
        // this.senha = 'admin';
    }

    login() {
        this.segurancaService.login(this.email, this.senha).then(() => {
            this.router.navigate(['/dashboard/inicial']).then(() => {
                this.alerta.sucesso("Login realizado com sucesso.");
            });
        })
            .catch(() => {
                this.alerta.error("Usuário/Senha inválidos.")
            });
    }

    getVersao() {
        return environment.version;
    }
}
