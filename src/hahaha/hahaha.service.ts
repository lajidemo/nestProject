import { Injectable } from '@nestjs/common';
import { CreateHahahaDto } from './dto/create-hahaha.dto';
import { UpdateHahahaDto } from './dto/update-hahaha.dto';

@Injectable()
export class HahahaService {
  create(createHahahaDto: CreateHahahaDto) {
    return 'This action adds a new hahaha';
  }

  findAll() {
    return `This action returns all hahaha`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hahaha`;
  }

  update(id: number, updateHahahaDto: UpdateHahahaDto) {
    return `This action updates a #${id} hahaha`;
  }

  remove(id: number) {
    return `This action removes a #${id} hahaha`;
  }
}
