import { PartialType } from '@nestjs/mapped-types';
import { CreateServicoDto } from './create-servico.dto.js';

export class UpdateServicoDto extends PartialType(CreateServicoDto) {}
