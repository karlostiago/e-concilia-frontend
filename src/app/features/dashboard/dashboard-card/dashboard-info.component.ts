import {Component, Input, OnInit} from '@angular/core';
import {Venda} from "../../../model/Venda";

@Component({
  selector: 'app-dashboard-info',
  templateUrl: './dashboard-info.component.html',
  styleUrls: ['./dashboard-info.component.css']
})
export class DashboardInfoComponent implements OnInit {

    @Input() vendas = new Array<Venda>();

    ngOnInit(): void { }
}
