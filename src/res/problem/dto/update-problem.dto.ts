import { PartialType } from '@nestjs/mapped-types';
import { CreateProblemDto } from './createProblem.dto';

export class UpdateProblemDto extends PartialType(CreateProblemDto) {}
