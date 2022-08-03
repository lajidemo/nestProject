import { PartialType } from '@nestjs/swagger';
import { CreateHahahaDto } from './create-hahaha.dto';

export class UpdateHahahaDto extends PartialType(CreateHahahaDto) {}
