import { Injectable } from '@nestjs/common';
import { CreateProfissionaiDto } from './dto/create-profissionai.dto.js';
import { UpdateProfissionaiDto } from './dto/update-profissionai.dto.js';

@Injectable()
export class ProfissionaisService {
  create(createProfissionaiDto: CreateProfissionaiDto) {
    return 'This action adds a new profissionai';
  }

  findAll() {
    return `This action returns all profissionais`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profissionai`;
  }

  update(id: number, updateProfissionaiDto: UpdateProfissionaiDto) {
    return `This action updates a #${id} profissionai`;
  }

  remove(id: number) {
    return `This action removes a #${id} profissionai`;
  }
}
