import { ApiProperty } from "@nestjs/swagger";

export class RateDto {
    @ApiProperty({
        description: "유저가 투표한 문제의 난이도입니다.",
        example: "Platinum3"
    })
    votedRank: string;

    @ApiProperty({
        description: "유저의 레이팅 코멘트입니다.",
        example: "이 문제는 푸는 것이 불가능하므로 플래3 난이도를 부여함."
    })
    comment: string;
}