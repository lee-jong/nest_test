import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChatbotRequestDataDTO } from './chatbot.dto';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async getChatbot(@Body() body: ChatbotRequestDataDTO) {
    try {
      const data = await this.chatbotService.getChatbotData(body);
      return data;
    } catch (e) {
      return e;
    }
  }
}
