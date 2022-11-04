import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  private usuarios = [];

  public criar(usuario: Usuario): Usuario {
    this.usuarios.push(usuario);
    return usuario;
  }

  public buscaPorNomeDeUsuario(nomeDeUsuario: string): Usuario {
    const usuarioEncontrado = this.usuarios.find(usuario => usuario.nome == nomeDeUsuario);

    return usuarioEncontrado;
  }
}
