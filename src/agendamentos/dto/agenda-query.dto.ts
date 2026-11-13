import { Type } from "class-transformer";
import { IsInt, Matches } from "class-validator";

export class AgendaQueryDto {
    @Type(() => Number)
    @IsInt()
    profissionalId: number;

    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: "data deve estar no formato AAAA-MM-DD",
    })
    data: string;
}