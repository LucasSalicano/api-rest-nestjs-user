import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FiltroExcessaoHttp } from './common/filtros/filtro-excessao-http.filter';
import { BuildResponseInterceptor } from './core/http/build-response.interceptor';
import { UsuarioModule } from './users/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroExcessaoHttp
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: BuildResponseInterceptor
    }
  ],
})
export class AppModule { }
