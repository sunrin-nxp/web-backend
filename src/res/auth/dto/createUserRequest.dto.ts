import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
    @ApiProperty({
        description: "새로운 유저의 id 값입니다.",
        example: 'nexpara'
    })
    id!: string;

    @ApiProperty({
        description: "새로운 유저의 pw 값입니다.",
        example: "isth1sR2alPassw0rd?"
    })
    pw!: string;

    @ApiProperty({
        description: "새로운 유저의 이메일 주소입니다.",
        example: "juan.lee@sktr.io"
    })
    email!: string;

    @ApiProperty({
        description: "새로운 유저의 닉네임 값입니다.\n(선택사항이므로 미입력 시 id 값 입력)",
        example: "넥티브파라"
    })
    nickname: string;
}