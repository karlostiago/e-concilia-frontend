import {Component, OnInit} from '@angular/core';
import {SegurancaService} from "../seguranca.service";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
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
        private notificacao: NotificacaoService,
        private router: Router) {
    }

    ngOnInit(): void {


    }

    login() {
        this.segurancaService.login(this.email, this.senha).then(() => {
            this.router.navigate(['/dashboard/inicial']).then(() => {
                this.notificacao.sucesso("Login realizado com sucesso.");
            });
        })
            .catch(() => {
                this.notificacao.error("Usuário/Senha inválidos.")
            });
    }

    getVersao() {
        return environment.version;
    }
}
