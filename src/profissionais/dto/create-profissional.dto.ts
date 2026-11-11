import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateProfissionaisDto {
    @IsString()
    @IsNotEmpty()
    nome: string
}
