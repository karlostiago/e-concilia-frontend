import {Grafico} from "./Grafico";

export class GraficoVendaMensal extends Grafico {
    dataSets: Array<DataSet>;
}

class DataSet {
    label: string;
    data: Array<number>;
}
