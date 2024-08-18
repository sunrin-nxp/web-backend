import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ProblemDto } from './dto/createProblem.dto';
import { SolutionDto } from './dto/solution.dto';
import { RateDto } from './dto/rate.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserStreak, IUserStreak } from '../../models/streak.schema';

@ApiTags("Problem")
@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @ApiOperation({
    summary: "문제 등록",
    description: "새로운 문제를 등록합니다."
  })
  @ApiResponse({
    status: 200,
    description: "등록 결과",
    schema: {
      properties: {
        result: {
          type: 'Boolean',
          description: "변경 결과입니다 (True / False)",
          example: true
        }
      }
    }
  })
  @Post('register')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProblemDto: ProblemDto, @Req() req) {
    console.log(req.id)
    return this.problemService.createProblem(createProblemDto, req.id);
  }

  @ApiOperation({
    summary: "솔루션 제출",
    description: "문제의 답 코드를 제출하여 채점합니다."
  })
  @ApiResponse({
    status: 200,
    description: "채점 결과",
    schema: {
      properties: {
        result: {
          type: 'Boolean',
          description: "변경 결과입니다 (True / False)",
          example: true
        }
      }
    }
  })
  @ApiParam({
    name: "id",
    example: "10001",
    description: "채점할 문제의 ID입니다.",
    type: "Number"
  })
  @Post(':id/solution')
  @UseGuards(JwtAuthGuard)
  async trySolve(@Param('id') problemId: number, @Body() solutionDto: SolutionDto, @Req() req) {
    return this.problemService.solveProblem(problemId, solutionDto, req.id);
  }

  @ApiOperation({
    summary: "문제 기여",
    description: "문제의 난이도를 평가합니다."
  })
  @ApiResponse({
    status: 200,
    description: "평가 제출 결과",
    schema: {
      properties: {
        result: {
          type: 'Boolean',
          description: "평가 반영 결과입니다 (True / False)",
          example: true
        }
      }
    }
  })
  @ApiParam({
    name: "id",
    example: "10001",
    description: "평가할 문제의 ID입니다.",
    type: "Number"
  })
  @Post(':id/rate')
  @UseGuards(JwtAuthGuard)
  async rateProblem(@Param('id') problemId: number, @Body() rateDto: RateDto, @Req() req) {
    return this.problemService.rateProblem(problemId, rateDto, req.id);
  }

  @ApiOperation({
    summary: "문제 데이터",
    description: "문제의 데이터를 반환합니다."
  })
  @ApiResponse({
    status: 200,
    description: "문제 데이터",
    schema: {
      properties: {
        creator: {
          type: 'String',
          description: "제작자의 id입니다.",
          example: "ninejuan"
        },
        problemNumber: {
          type: "Number",
          description: "문제의 ID입니다.",
          example: "10001"
        },
        rankPoint: {
          type: "String",
          description: "문제의 랭크입니다. (ex. Bronze4, Platinum2, Ace)",
          example: "Platinum2"
        },
        subject: {
          type: "String",
          description: "문제의 제목입니다.",
          example: "생일 케이크 만들기"
        },
        content: {
          type: "String",
          description: "문제의 내용입니다. (Image Buffer 포함)",
          example: "케이크의 개수 a와 사람의 머릿수 b"
        },
        testcases: {
          type: "Array<{ input: String; output: String; }>",
          description: "문제의 테스트케이스입니다.",
          example: "{ input: \"1 2\", output: \"3\" }"
        },
        answerCode: {
          type: "String",
          description: "문제의 정답 코드입니다.",
          example: "a,b=map(int,input().split());print(a+b)"
        },
        userRate: {
          type: "Array<{ userid: String, votedRank: String, comment: String, createdAt: Number }>",
          description: "유저의 평가입니다.",
          example: "{ userid: \"ninejuan\", votedRank: \"Platinum2\", comment: \"덧셈은 어렵다\", createdAt: 00000}"
        },
        createdAt: {
          type: "Number",
          description: "문제가 생성된 시각입니다.",
          example: "00000000"
        }
      }
    }
  })
  @ApiParam({
    name: "id",
    example: "10001",
    description: "정보를 받을 문제의 ID입니다.",
    type: "Number"
  })
  @Get(':id')
  async getProblem(@Param() pno: number) {
    return this.problemService.getProblem(pno);
  }

  @ApiOperation({
    summary: "문제 수정",
    description: "문제를 수정합니다."
  })
  @ApiResponse({
    status: 200,
    description: "수정 결과",
    schema: {
      properties: {
        result: {
          type: 'Boolean',
          description: "수정 결과입니다 (True / False)",
          example: true
        }
      }
    }
  })
  @ApiParam({
    name: "id",
    example: "10001",
    description: "수정할 문제의 ID입니다.",
    type: "Number"
  })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async editProblem(@Param('id') id: number, @Body() editProblemDto: ProblemDto, @Req() req) {
    return this.problemService.editProblem(id, editProblemDto, req.id);
  }

  @ApiOperation({
    summary: "문제 삭제",
    description: "문제를 삭제합니다."
  })
  @ApiResponse({
    status: 200,
    description: "문제 삭제 결과",
    schema: {
      properties: {
        result: {
          type: 'Boolean',
          description: "문제 삭제 결과입니다 (True / False)",
          example: true
        }
      }
    }
  })
  @ApiParam({
    name: "id",
    example: "10001",
    description: "삭제할 문제의 ID입니다.",
    type: "Number"
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProblem(@Param('id') id: number, @Req() req) {
    return this.problemService.deleteProblem(id, req.id);
  }
}
