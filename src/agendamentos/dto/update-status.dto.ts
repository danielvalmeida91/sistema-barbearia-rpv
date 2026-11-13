import { IsIn } from "class-validator";

export const STATUS_FINAIS = ["CANCELADO", "CONCLUIDO", "FALTOU"] as const;
export type StatusFinal = (typeof STATUS_FINAIS)[number];

export class UpdateStatusDto {
    @IsIn([...STATUS_FINAIS], {
        message: "status deve ser CONCLUIDO, CANCELADO ou FALTOU",
    })
    status: StatusFinal;
}