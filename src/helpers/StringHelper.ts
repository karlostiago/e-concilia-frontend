export class StringHelper {

    static primeiroCaracterMaiusculo (str: string): string {
        return str.charAt(0).toUpperCase();
    }

    static removePrimeiroCaracter (str: string): string {
        return str.substring(1, str.length);
    }

    static primeiroCaracterMaiusculoPorPalavra (str: string): string {
        const palavras = str.split(" ");
        let novoCaracter = "";

        for (const palavra of palavras) {
            const primeiroCaracter = this.primeiroCaracterMaiusculo(palavra);
            const complemento = this.removePrimeiroCaracter(palavra).toLowerCase();
            novoCaracter += primeiroCaracter + complemento + ' ';
        }

        return novoCaracter.trim();
    }
}
