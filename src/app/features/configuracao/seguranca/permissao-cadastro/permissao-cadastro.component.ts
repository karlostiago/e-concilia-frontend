import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../../model/Usuario";
import { UsuarioService } from '../usuario.service';
import { FiltroUsuario } from '../../../../filter/FiltroUsuario';


interface PermissaoTela {
  nome: string;
  cadastrar: boolean;
  atualizar: boolean;
  consultar: boolean;
  excluir: boolean;
}

@Component({
  selector: 'app-permissao-cadastro',
  templateUrl: './permissao-cadastro.component.html',
  styleUrls: ['./permissao-cadastro.component.css']
})


export class PermissaoCadastroComponent implements OnInit {
  
  usuarios: Usuario[]
  usuario = new Usuario();
  telasPermissoes: PermissaoTela[] = [];

  ngOnInit(): void {
    this.carregarUsuarios();
    this.telaPermissoes();

  }

  constructor(
    private usuarioService: UsuarioService
  ) { }

  private carregarUsuarios () {
     this.usuarioService.pesquisar(new FiltroUsuario()).then(usuarios => {
         this.usuarios = usuarios;
     });
  }

  private telaPermissoes() {
    this.telasPermissoes = [
      { nome: 'Empresas', cadastrar: false, atualizar: true, consultar: false, excluir: false },
      { nome: 'Conciliador ifood', cadastrar: true, atualizar: false, consultar: true, excluir: false },
    ];
  }
}