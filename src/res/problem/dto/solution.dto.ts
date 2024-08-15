import { ApiProperty } from "@nestjs/swagger";

export class SolutionDto {
    @ApiProperty({
        description: "유저가 제출한 솔루션 코드의 언어입니다.",
        example: "py"
    })
    language!: string;

    @ApiProperty({
        description: "유저의 솔루션 코드입니다.",
        example: "a,b=map(int,input().split());print(a+b)"
    })
    code: string;
}