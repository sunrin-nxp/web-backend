import { Injectable } from '@nestjs/common';
import { ProblemDto } from './dto/createProblem.dto';
import { SolutionDto } from './dto/solution.dto';
import problemsSchema from 'src/models/problems.schema';
import { newProblemNumber } from '../../utils/newProblemNumber.util';
import { config } from 'dotenv';
import userSchema from 'src/models/user.schema';
import { defaultIfEmpty } from 'rxjs';
import { RateDto } from './dto/rate.dto';
import rankPoint from 'src/enums/rankPoint.enum';



config(); const env = process.env;

@Injectable()
export class ProblemService {
  async createProblem(createProblemDto: ProblemDto, userid: string) {
    const problemNumber = await newProblemNumber();
    const newPb = await new problemsSchema({
      creator: userid,
      problemNumber: problemNumber,
      subject: createProblemDto.subject,
      content: createProblemDto.content,
      testcases: createProblemDto.testcases,
      rankPoint: createProblemDto.rank
    });
    if (createProblemDto.answer) newPb.answerCode = createProblemDto.answer;
    await newPb.save();
    return {
      result: true
    } 
  }

  async getProblem(no: number) {
    let problem = await problemsSchema.findOne({ problemNumber: no });
    if (!problem) problem = null;
    return problem;
  }

  async editProblem(probNum: number, jureuk: ProblemDto, userid: string) {
    let problem = await problemsSchema.findOne({ problemNumber: probNum });
    if (problem.creator !== userid) return {
      result: false
    }; else {
      await problemsSchema.findOneAndUpdate({ problemNumber: probNum }, {
        rankPoint: jureuk.rank,
        answerCode: jureuk.answer ?? "",
        subject: jureuk.subject,
        content: jureuk.content,
        testcases: jureuk.testcases
      });
      return {
        result: true
      };
    }
  }

  async deleteProblem(id: number, userid: string) {
    const problem = await problemsSchema.findOne({ problemNumber: id });
    if (problem.creator !== userid) {
      return {
        result: false
      }
    } else {
      await problem.deleteOne({ problemNumber: id })
      return {
        result: true
      }
    }
  }

  async solveProblem(problemId: number, solutionDto: SolutionDto, userid: number) {
    const fetchReq: any = await fetch(`${env.JUDGE_DOMAIN}`, {
      method: "POST",
      body: JSON.stringify({
        problemNumber: problemId,
        userid: userid,
        language: solutionDto.language,
        usercode: solutionDto.code
      })
    });
    const user = await userSchema.findOne({ nxpid: userid });
    const probNum = problemId.toString();
    switch(fetchReq.json().result) {
      case "정답입니다":
        if (probNum in user.wrong_problems) user.wrong_problems.splice(user.wrong_problems.indexOf(probNum), 1);
        if (!(probNum in user.solved_problems)) user.solved_problems.unshift(probNum);
        await user.save();
        break;
      case "틀렸습니다":
        if (!(probNum in user.wrong_problems)) user.wrong_problems.unshift(probNum);
        await user.save(); 
        break;
      default:
        break;
    }
    return {
      result: true ? fetchReq.json().result == "정답입니다" : false,
      message: fetchReq.json().result
    };
  }

  async rateProblem(problemId: number, rateDto: RateDto, userid: string) {
    const problem = await problemsSchema.findOne({ problemNumber: problemId });
    let filteredRates: any = problem.userRate.filter(item => item.userid !== userid);
    filteredRates.unshift({ userid: userid, votedRank: rateDto.votedRank, comment: rateDto.comment });
    problem.userRate = filteredRates;
    problem.rankPoint = rankPoint[Math.round((rankPoint[problem.rankPoint] + rankPoint[rateDto.votedRank]) / 2)];
    await problem.save();
    return {
      result: true
    }
  }
}
