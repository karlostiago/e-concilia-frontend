export class FormatacaoMoedaPtBR {
    static monetario (valor: number) {
        return new Intl.NumberFormat('pt-BR',  { style: 'currency', currency: 'BRL' })
            .format(valor);
    }

    static percentual (valor: number) {
        return new Intl.NumberFormat('pt-BR',  { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2})
            .format(valor / 100);
    }
}
