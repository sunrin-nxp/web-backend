import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './createUser.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
