import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ProblemDto } from './dto/createProblem.dto';
import { SolutionDto } from './dto/solution.dto';
import { prototype } from 'events';
import { RateDto } from './dto/rate.dto';

@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProblemDto: ProblemDto, @Req() req) {
    return this.problemService.createProblem(createProblemDto, req.id);
  }

  @Post(':id/solution')
  @UseGuards(JwtAuthGuard)
  async trySolve(@Param('id') problemId: number, @Body() solutionDto: SolutionDto, @Req() req) {
    return this.problemService.solveProblem(problemId, solutionDto, req.id);
  }

  @Post(':id/rate')
  @UseGuards(JwtAuthGuard)
  async rateProblem(@Param('id') problemId: number, @Body() rateDto: RateDto, @Req() req) {
    return this.problemService.rateProblem(problemId, rateDto, req.id);
  }

  @Get(':id')
  async getProblem(@Param() pno: number) {
    return this.problemService.getProblem(pno);
  }

  @Put('id')
  @UseGuards(JwtAuthGuard)
  async editProblem(@Param('id') id: number, @Body() editProblemDto: ProblemDto, @Req() req) {
    return this.problemService.editProblem(id, editProblemDto, req.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProblem(@Param('id') id: number, @Req() req) {
    return this.problemService.deleteProblem(id, req.id);
  }
}
