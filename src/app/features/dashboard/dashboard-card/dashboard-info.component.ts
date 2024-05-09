import {Component, Input, OnInit} from '@angular/core';
import {Dashboard} from "../../../model/Dashboard";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {SegurancaService} from "../../seguranca/seguranca.service";

@Component({
    selector: 'app-dashboard-info',
    templateUrl: './dashboard-info.component.html',
    styleUrls: ['./dashboard-info.component.css']
})
export class DashboardInfoComponent implements OnInit {

    @Input() dashboard = new Dashboard();

    ngOnInit(): void {
    }

    constructor(public segurancaService: SegurancaService) {
    }

    formatarMoeda(valor: number) {
        return FormatacaoMoedaPtBR.monetario(valor);
    }

    formatarPercentual(valor: number) {
        return FormatacaoMoedaPtBR.percentual(valor);
    }
}
