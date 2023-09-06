export class DataHelpers {

    static formatPtBr(data: Date) {
        const dia = this.adicionarZero(data.getDate());
        const mes = this.adicionarZero(data.getMonth() + 1);
        const ano = this.adicionarZero(data.getFullYear());
        return `${dia}/${mes}/${ano}`;
    }

    private static adicionarZero(valor: number) {
        return valor < 10 ? '0' + valor : valor;
    }
}
