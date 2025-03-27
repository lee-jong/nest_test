import {
  Injectable,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { SessionsClient } from '@google-cloud/dialogflow';
import { ChatbotRequestDataDTO } from './chatbot.dto';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class ChatbotService {
  async getChatbotData(data: ChatbotRequestDataDTO): Promise<any> {
    try {
      const { text, languageCode } = data;
      const projectId = process.env.PROJECT_ID ?? '';
      const sessionId = uuidV4();
      const client_email = process.env.CLIENT_EMAIL;
      const private_key = process.env.PRIVATE_KEY?.replace(/\\n/g, '\ndd');

      const sessionClient = new SessionsClient({
        credentials: {
          client_email,
          private_key,
        },
      });

      const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId,
      );

      const reqData = {
        session: sessionPath,
        queryInput: {
          text: {
            text,
            languageCode,
          },
        },
      };

      // google dialogflow response  data
      const resData = await sessionClient
        .detectIntent(reqData)
        .then((res) => {
          return {
            status: 200,
            data: res[0].queryResult,
          };
        })
        .catch(() => {
          throw new InternalServerErrorException(
            'Internal Server Error - Google DialogFlow',
          );
        });

      return resData;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
}
