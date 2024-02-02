export class FiltroDashboard {
    empresaId = null;
    dtInicial = new Date();
    dtFinal = new Date();
    periodo = new Date();

    constructor() {
        this.calcularPeriodo();
    }

    calcularPeriodo() {
        this.dtInicial = new Date(this.periodo.getFullYear(), this.periodo.getMonth(), 1);
        this.dtFinal = new Date(this.periodo.getFullYear(), this.periodo.getMonth() + 1, 0);
    }
}
