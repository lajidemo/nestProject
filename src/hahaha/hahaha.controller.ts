import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HahahaService } from './hahaha.service';
import { CreateHahahaDto } from './dto/create-hahaha.dto';
import { UpdateHahahaDto } from './dto/update-hahaha.dto';

@Controller('hahaha')
export class HahahaController {
  constructor(private readonly hahahaService: HahahaService) {}

  @Post()
  create(@Body() createHahahaDto: CreateHahahaDto) {
    return this.hahahaService.create(createHahahaDto);
  }

  @Get()
  findAll() {
    return this.hahahaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hahahaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHahahaDto: UpdateHahahaDto) {
    return this.hahahaService.update(+id, updateHahahaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hahahaService.remove(+id);
  }
}
