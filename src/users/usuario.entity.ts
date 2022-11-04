import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsNomeDeUsuarioUnico } from "./user.validator";

export class Usuario {
  id: number;

  @Expose({
    name: 'name'
  })
  @IsNomeDeUsuarioUnico({
    message: 'nomeDeUsuario precisa ser único.'
  })
  @IsNotEmpty({
    message: 'nome é obrigatório.',
  })
  @IsString()
  nome: string;

  @Expose({
    name: 'email'
  })
  @IsEmail()
  @IsNotEmpty({
    message: 'email é obrigatório.',
  })
  email: string;

  @Expose({
    name: 'password'
  })
  @Exclude({
    toPlainOnly: true
  })
  @IsNotEmpty({
    message: 'senha é obrigatória.',
  })
  senha: string;

  @Expose({
    name: 'joinDate'
  })
  dataCadastro: Date;
}
