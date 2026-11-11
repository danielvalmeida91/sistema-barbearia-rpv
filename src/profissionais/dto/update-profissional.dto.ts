import { PartialType } from '@nestjs/mapped-types';
import { CreateProfissionaisDto } from './create-profissional.dto.js';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateProfissionaisDto extends PartialType(CreateProfissionaisDto) {
    @IsOptional()
    @IsBoolean()
    ativo?: boolean;
}
