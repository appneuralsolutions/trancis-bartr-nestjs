import { ApiProperty } from "@nestjs/swagger";

export class PushNotificationDTO {
    @ApiProperty()
    public readonly token: string;
    @ApiProperty()
    public readonly title: string;
    @ApiProperty()
    public readonly body: string;

}