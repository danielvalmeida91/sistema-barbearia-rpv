import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateServicoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    // @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    preco: number;

    @IsInt()
    @Min(5)
    duracaoMin: number;
}
