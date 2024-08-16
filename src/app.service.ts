import { Injectable } from '@nestjs/common'; 

@Injectable()
export class AppService {
  async mainPage() {
    return {
      banner: {
        background_color: ""  ,
        boxText: "",
        title: "",
        content: "",
        imgUrl: ""
      },
      problems: [{ // 제일 최신 문제 50개 반환

      }],
      streak: "",
      dailyQuest: [
        {
          title: "생일 케이크 만들기",
          rank: "Silver3",
          solved: true
        },
        {
          title: "선린냥이지기",
          rank: "Platinum1",
          solved: false
        },
        {
          title: "비가 주륵 내리고 나면",
          rank: "Master",
          solved: false
        }
      ]
    };
  }
}
