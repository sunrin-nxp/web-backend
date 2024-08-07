import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
    @ApiProperty({
        description: "로그인 요청자의 id 값입니다.",
        example: 'nexpara'
    })
    id!: string;

    @ApiProperty({
        description: "로그인 요청자의 pw 값입니다.",
        example: "isth1sR2alPassw0rd?"
    })
    pw!: string;
}