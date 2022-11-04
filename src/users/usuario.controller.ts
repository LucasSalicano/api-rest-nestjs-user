import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-reponse-builder';

@Controller('users')
export class UsuarioController {
  constructor(private usuarioServie: UsuarioService) { }

  @Post()
  public criar(@Body() usuario: Usuario): NestResponse {
    const novoUsuario = this.usuarioServie.criar(usuario);

    return new NestResponseBuilder()
      .body(usuario)
      .status(HttpStatus.CREATED)
      .build();
  }

  @Get(":nome")
  public getUsuarioByNome(@Param() params) {
    const usuario = this.usuarioServie.buscaPorNomeDeUsuario(params.nome);

    if (!usuario) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Usu[ario náo encontrado."
      });
    }

    return usuario;
  }

}
