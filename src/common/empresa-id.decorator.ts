import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const EmpresaId = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): number => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const id = Number(request.headers['x-empresa-id']);

        if (!Number.isInteger(id) || id <= 0) {
            throw new BadRequestException('Header x-empresa-id é obrigatório');
        }

        return id;
    });