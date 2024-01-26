import {inject} from "@angular/core";
import {SegurancaService} from "./features/seguranca/seguranca.service";
import {Router} from "@angular/router";

export const CanActivate = () => {
    const segurancaService = inject(SegurancaService);
    const router = inject(Router);

    if (segurancaService.isLogado()) {

        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};
