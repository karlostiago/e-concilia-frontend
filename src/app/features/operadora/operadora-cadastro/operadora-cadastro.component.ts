import {Component, OnInit} from '@angular/core';
import {Taxa} from "../../../model/Taxa";
import {Operadora} from "../../../model/Operadora";
import {NotificacaoService} from "../../../shared/notificacao/notificacao.service";
import {OperadoraService} from "../operadora.service";
import {ErroHandlerService} from "../../../core/ErroHandlerService";
import {FormatacaoMoedaPtBR} from "../../../../helpers/FormatacaoMoedaPtBR";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-operadora-cadastro',
  templateUrl: './operadora-cadastro.component.html',
  styleUrls: ['./operadora-cadastro.component.css']
})
export class OperadoraCadastroComponent implements OnInit {

    operadora = new Operadora();
    taxa = new Taxa();
    visivel: boolean;

    constructor(
        private notificacao: NotificacaoService,
        private operadoraService: OperadoraService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private error: ErroHandlerService) {}

    ngOnInit(): void {
        const operadoraId = this.activatedRoute.snapshot.params['id'];

        if (operadoraId) {
            this.pesquisarPorId(operadoraId);
        }
    }

    pesquisarPorId (id: number) {
        this.operadoraService.pesquisarPorId(id).then(response => {
            this.operadora = response;
        })
        .catch(error => {
            this.error.capturar(error);
        });
    }

    abrirModalCadastroNovaTaxa () {
        this.visivel = true;
    }

    async salvarOuEditar (form: NgForm) {
        if (this.operadora.id) {
            await this.editar();
        } else {
            await this.salvar(form);
        }
    }

    salvar(ngForm: NgForm) {
        this.operadoraService.salvar(this.operadora).then(operadora => {
            this.notificacao.sucesso("Operadora cadastrada com sucesso.");
            this.operadora = new Operadora();
            ngForm.resetForm();
        })
        .catch(error => {
            this.error.capturar(error);
        });
    }

    async editar () {
        this.operadoraService.editar(this.operadora)
            .then(resposta => {
                this.notificacao.sucesso("Operadora atualizada com sucesso.");
            })
            .catch(error => {
                this.error.capturar(error);
            });
    }

    salvarTaxa (taxa: Taxa) {
        this.verificaDuplicidadeDeTaxa(taxa);
        this.operadoraService.validarTaxa(taxa).then(response => {
            response.ativo = response.expiraEm > 0;
            this.operadora.taxas.push(response);
            this.taxa = new Taxa();
            this.visivel = false;
        })
        .catch(error => {
            this.error.capturar(error);
        })
    }

    excluirTaxa (taxa: Taxa) {
        const index = this.operadora.taxas.indexOf(taxa);
        if (index > -1) {
            this.operadora.taxas.splice(index, 1);
        }
    }

    formatarMoeda (valor: number) {
        return FormatacaoMoedaPtBR.formatar(valor);
    }

    voltar () {
        return this.router.navigate(["/consulta/operadoras"])
    }

    private verificaDuplicidadeDeTaxa (taxa: Taxa) {
        const taxaEncontrada = this.operadora.taxas.filter(t => t.descricao === taxa.descricao);
        if (taxaEncontrada.length > 0) {
            const mensagem = `Taxa ${taxa.descricao}, está duplicada na lista.`;
            this.notificacao.error(mensagem);
            throw new Error(mensagem);
        }
    }
}
