import {
    registerDecorator,
    ValidationArguments, ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidatorOptions,
} from 'class-validator';
import {UsuarioService} from './usuario.service';
import {Injectable} from '@nestjs/common';

@Injectable()
@ValidatorConstraint()
export class IsNomeUsuarioUnicoConstraint implements ValidatorConstraintInterface {

    constructor(private usuarioService: UsuarioService) {
    }

    validate(nomeUsuario: string, validationArguments?: ValidationArguments,): Promise<boolean> | boolean {
        return !!!this.usuarioService.buscaPorNomeDeUsuario(nomeUsuario);
    }
}

export function IsNomeDeUsuarioUnico(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNomeUsuarioUnicoConstraint,
        });
    };
}
