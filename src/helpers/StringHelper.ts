export class StringHelper {

    static preencherComZero(valor: string, quantidadeDeZeros: number, direita: boolean) {
        if (direita) {
            return valor.toString().padEnd(quantidadeDeZeros, '0');
        }

        return valor.toString().padStart(quantidadeDeZeros, '0');
    }
}
