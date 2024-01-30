export class NumberHelper {

    static preencherComZero(valor: string, quantidadeDeZeros: number, direita: boolean) {
        if (direita) {
            return valor.toString().padEnd(quantidadeDeZeros, '0');
        }

        return valor.toString().padStart(quantidadeDeZeros, '0');
    }

    static max(percentual: number, multiplo: number, ...values: number[]) {
        const max = Math.max(...values);
        return Math.ceil( (max + (max * percentual) / 100) / multiplo) * multiplo;
    }
}
