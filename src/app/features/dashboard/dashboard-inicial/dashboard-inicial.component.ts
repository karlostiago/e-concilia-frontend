import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-inicial',
  templateUrl: './dashboard-inicial.component.html',
  styleUrls: ['./dashboard-inicial.component.css']
})
export class DashboardInicialComponent implements OnInit {

    dtInicial = new Date();
    dtFinal = new Date();

    ngOnInit(): void {
    }

}
