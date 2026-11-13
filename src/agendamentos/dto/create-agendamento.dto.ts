import { ArrayNotEmpty, ArrayUnique, IsArray, IsDateString, IsInt } from "class-validator";

export class CreateAgendamentoDto {
    @IsInt()
    clienteId: number;

    @IsInt()
    profissionalId: number;

    @IsDateString()
    inicio: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsInt({ each: true })
    servicoIds: number[];
}
