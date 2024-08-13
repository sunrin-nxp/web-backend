import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ProblemDto } from './dto/createProblem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  create(@Body() createProblemDto: ProblemDto) {
    return this.problemService.create(createProblemDto);
  }

  @Get(':id')
  async getProblem(@Param() pno: number) {
    return this.problemService.getProblem(pno);
  }
}
