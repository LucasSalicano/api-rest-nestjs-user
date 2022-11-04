import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { NestResponse } from "./nest-response";

@Injectable()
export class BuildResponseInterceptor implements NestInterceptor {

    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(
                map((respostaControlador: NestResponse) => {
                    if (respostaControlador instanceof NestResponse) {
                        const contexto = context.switchToHttp();
                        const response = contexto.getResponse();
                        const { headers, status, body } = respostaControlador;

                        const nomeCabecalhos = Object.getOwnPropertyNames(headers);

                        nomeCabecalhos.forEach(nomeCabecalhos => {
                            const valorCabecalho = headers[nomeCabecalhos];
                            this.httpAdapter.setHeader(response, nomeCabecalhos, valorCabecalho);
                        });

                        this.httpAdapter.status(response, status);

                        return body;
                    }
                    return respostaControlador;
                })
            );
    }

}