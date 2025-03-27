import { IsString, IsNotEmpty } from 'class-validator';
export class ChatbotRequestDataDTO {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  languageCode: string;
}
