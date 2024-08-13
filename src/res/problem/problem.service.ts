import { Injectable } from '@nestjs/common';
import { ProblemDto } from './dto/createProblem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import problemsSchema from 'src/models/problems.schema';

@Injectable()
export class ProblemService {
  create(createProblemDto: ProblemDto) {
    return 'This action adds a new problem';
  }

  async getProblem(no: number) {
    let problem = await problemsSchema.findOne({ problemNumber: no });
    if (!problem) problem = null;
    return problem;
  }
}
