import {OutputType} from "jspdf-invoice-template";

export class TemplatePDF {

    criar(nomeArquivo: string, dados: any[][], cabecalho: any[], info: any, orientacaoPaisagem: boolean) {
        return {
            outputType: OutputType.Save,
            returnJsPDFDocObject: true,
            fileName: nomeArquivo,
            orientationLandscape: orientacaoPaisagem,
            compress: true,
            logo: {
                src: "assets/img/logo.jpg",
                type: 'JPG', //optional, when src= data:uri (nodejs case)
                width: 43.33, //aspect ratio = width/height
                height: 26.66,
                margin: {
                    top: 0, //negative or positive num, from the current position
                    left: 0 //negative or positive num, from the current position
                }
            },
            business: {
                name: "E-CONCILIA",
                address: "Rua Salvador Correia de Sá, 1213, Sapiranga, Fortaleza-Ce",
                phone: "(+55) 85 3077-2122",
                email: "comercial@econcilia.com",
                email_1: "info@econcilia.com",
                website: "www.econcilia.com.br",
            },
            contact: this.getInfo(info),
            invoice: {
                headerBorder: false,
                tableBodyBorder: false,
                header: cabecalho,
                table: dados
            },
            pageEnable: true,
            pageLabel: "Pag ",
        };
    }

    private getInfo(info: any) {
        return {
            label: info.titulo,
            name: info.nome,
            address: info.endereco,
            phone: info.telefone,
            email: info.email
        };
    }
}
