import { Injectable } from '@nestjs/common'; 
import { ProblemService } from './res/problem/problem.service';

@Injectable()
export class AppService {
  constructor(
    private problemService: ProblemService
  ) { }
  async getDefaultMainPage() {
    // 대강 로그인하라는 페이지를 만들까
    // 
    return {

    }
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
