import { Component, OnInit } from '@angular/core';
import {FiltroUsuario} from "../../../../filter/FiltroUsuario";
import {Usuario} from "../../../../model/Usuario";
import { UsuarioService } from '../usuario.service';
import {NotificacaoService} from "../../../../shared/notificacao/notificacao.service";
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-permissao-consulta',
  templateUrl: './permissao-consulta.component.html',
  styleUrls: ['./permissao-consulta.component.css']
})
export class PermissaoConsultaComponent implements OnInit {

  usuarios: Usuario[];

  filtroUsuario = new FiltroUsuario();

  constructor(private usuarioService: UsuarioService,
    private notificacao: NotificacaoService,
    private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.pesquisar();
  }

  async pesquisar () {
    await this.usuarioService.pesquisar(this.filtroUsuario).then(usuarios => {
        this.usuarios = usuarios;
    });

    if (this.usuarios.length === 0) {
        this.notificacao.atencao("A consulta não retornou nenhum resultado.")
        this.usuarios = [];
    }
}

  editarPermissao(usuario: any) {}

  dessasociarPermissaoUsuario(usuario: any) {}

}