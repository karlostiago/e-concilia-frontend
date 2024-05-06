import {Component, OnInit} from '@angular/core';
import {Operadora} from "../../../../model/Operadora";
import {Empresa} from "../../../../model/Empresa";
import {FiltroOperadora} from "../../../../filter/FiltroOperadora";
import {FiltroEmpresa} from "../../../../filter/FiltroEmpresa";
import {EmpresaService} from "../../../empresa/empresa.service";
import {OperadoraService} from "../../../operadora/operadora.service";
import {SegurancaService} from "../../../seguranca/seguranca.service";
import {ParametroService} from "../parametro.service";
import {Parametro} from "../../../../model/Parametro";
import {AlertaService} from "../../../../shared/alerta/alerta.service";

@Component({
  selector: 'app-parametro-consulta',
  templateUrl: './parametro-consulta.component.html',
  styleUrls: ['./parametro-consulta.component.css']
})
export class ParametroConsultaComponent implements OnInit {

    operadoras = new Array<Operadora>();
    empresas = new Array<Empresa>();
    parametros = new Array<Parametro>();

    empresaId = null;
    operadoraId = null;

    constructor(private empresaService: EmpresaService,
                private parametroService: ParametroService,
                private operadoraService: OperadoraService,
                private alerta: AlertaService,
                public segurancaService: SegurancaService){ }

    ngOnInit(): void {
        this.carregarEmpresas();
        this.carregarOperadoras();
        this.pesquisar();
    }

    pesquisar() {
        this.parametroService.pesquisar(this.empresaId, this.operadoraId).then(parametros => {
            this.parametros = parametros;
            if (this.parametros.length === 0) {
                this.alerta.atencao("A consulta não retornou nenhum resultado.");
                this.parametros = [];
            }
        });
    }

    ativarOuDesativar(parametro: Parametro) {
        const temErroDeValidacao = this.temErrosDeValidacao();
        if (!temErroDeValidacao) {
            this.parametroService.salvar(parametro).then(response => {
                parametro.ativo = response.ativo;
                this.alerta.sucesso("Parametro ativado com sucesso.");
            });
        }
    }

    limpar() {
        this.empresaId = null;
        this.operadoraId = null;
        this.pesquisar();
    }

    private temErrosDeValidacao() {
        let validado = false;
        if (!this.empresaId) {
            this.alerta.error("Selecione uma empresa!");
            validado = true;
        } else if (!this.operadoraId) {
            this.alerta.error("Selecione uma operadora!");
            validado = true;
        }
        return validado;
    }

    private carregarEmpresas() {
        const usuario = this.segurancaService.getUsuario();
        this.empresaService.pesquisar(new FiltroEmpresa()).then(empresas => {
            this.empresas = empresas;
            if (usuario !== null) {
                this.empresas = usuario.lojasPermitidas;
            }
        });
    }

    private carregarOperadoras() {
        this.operadoraService.pesquisar(new FiltroOperadora()).then(operadoras => {
            this.operadoras = operadoras;
        });
    }
}
