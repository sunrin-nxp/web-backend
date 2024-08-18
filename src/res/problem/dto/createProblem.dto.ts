import { ApiProperty } from "@nestjs/swagger";

export class ProblemDto {
    @ApiProperty({
        description: "문제의 제목입니다.",
        example: "내 실력이 이럴 리 없어"
    })
    subject!: string;

    @ApiProperty({
        description: "문제 내용입니다.",
        example: "이주안은 3년차 주니어 개발자이다.<br>시험기간으로 인해 1달동안 코딩을 쉬고 왔더니 아무것도 기억나지 않는다.<br>이주안을 구하여라."
    })
    content: string;

    @ApiProperty({
        description: "문제의 레벨입니다.",
        example: "Ace"
    })
    rank: string;

    @ApiProperty({
        description: "문제의 테스트케이스들입니다.",
        examples: [
            { input: "1 2", output: "3"},
            { input: "3 4", output: "7"},
            { input: "119 9", output: "128"}
        ]
    })
    testcases: Array<{ input: number, output: string }>

    @ApiProperty({
        description: "문제 제작자의 정답 코드입니다.",
        example: "a, b = map(int, input().split()); print(a+b)"
    })
    answer?: string;
};