import { PartialType } from '@nestjs/mapped-types';
import { CreateProfissionaiDto } from './create-profissionai.dto.js';

export class UpdateProfissionaiDto extends PartialType(CreateProfissionaiDto) {}
