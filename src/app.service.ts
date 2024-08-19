import { Injectable } from '@nestjs/common'; 
import { ProblemService } from './res/problem/problem.service';

@Injectable()
export class AppService {
  constructor(
    private problemService: ProblemService
  ) { }
  async getDefaultMainPage() {
    const getRecentProblems = await this.problemService.getRecentProblems(50);
    return {
      problems: getRecentProblems,
      streak: "?",
      dailyQuest: "로그인을 해주세요"
    };
  }

  async getUserMainPage(userid: string) {
    const userStreak = await this.problemService.getCurrentStreak(userid);
    const recommendProblems = await this.problemService.getRecommendedProblems(userid);
    const getRecentProblems = await this.problemService.getRecentProblems(50);
    // 생각해보니 문제 검색 구현해야하는데
    return {
      problems: getRecentProblems,
      streak: userStreak,
      dailyQuest: recommendProblems
    };
  }
}
