export class DataHelpers {

    static formatPtBr(data: Date) {
        const dia = this.adicionarZero(data.getDate());
        const mes = this.adicionarZero(data.getMonth() + 1);
        const ano = this.adicionarZero(data.getFullYear());
        return `${dia}/${mes}/${ano}`;
    }

    static formatUs(data: Date) {
        const dia = this.adicionarZero(data.getDate());
        const mes = this.adicionarZero(data.getMonth() + 1);
        const ano = this.adicionarZero(data.getFullYear());
        return `${ano}-${mes}-${dia}`;
    }

    static remove30Dias(data: Date): number {
        return data.setDate(data.getDate() - 30);
    }

    static removeDias(data: Date, dias: number): number {
        return data.setDate(data.getDate() - dias);
    }

    static primeiroDiaMesCorrente(data: Date) {
        const dtCorrente = new Date();
        const primeiroDia = new Date(dtCorrente.getFullYear(), dtCorrente.getMonth(), 1);
        return data.setDate(primeiroDia.getDate());
    }

    private static adicionarZero(valor: number) {
        return valor < 10 ? '0' + valor : valor;
    }
}
