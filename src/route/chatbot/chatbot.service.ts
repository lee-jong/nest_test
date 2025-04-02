import {
  Injectable,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { SessionsClient } from '@google-cloud/dialogflow';
import { ChatbotRequestDataDTO, ChatbotResponseDataDTO } from './chatbot.dto';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class ChatbotService {
  sessionClient: SessionsClient;
  constructor() {
    this.#dialogFlowInit();
  }

  #dialogFlowInit() {
    const client_email = process.env.CLIENT_EMAIL;
    const private_key = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n');

    this.sessionClient = new SessionsClient({
      credentials: {
        client_email,
        private_key,
      },
    });
  }

  async #dialogFlowDataHandler(chatbotData) {
    const [res] = chatbotData;
    if (!res.queryResult) throw new Error();

    const { fulfillmentMessages: messages, intent } = res.queryResult;
    const { endInteraction, isFallback } = intent;

    if (!messages || !messages.length) throw new Error();
    if (isFallback) {
      // TODO : 답변하지 못 한 메시지 이력 관리
    }

    const resData = await Promise.all(
      // TODO : 메시지 정제
      messages.map((msg) => {
        const data = new ChatbotResponseDataDTO(msg).data;
        console.log('여기', data);
        return { ...data };
      }),
    );

    console.log('~~~', resData);

    return { resData, isFallback, endInteraction };
  }

  async getChatbotData(req: ChatbotRequestDataDTO): Promise<any> {
    try {
      const { projectId, text, languageCode, session_path } = req;

      const sessionId = uuidV4();

      // TODO : History Data
      console.log('history data # 1', projectId, text, languageCode, sessionId);

      const sessionPath =
        session_path ??
        this.sessionClient.projectAgentSessionPath(projectId, sessionId);

      const reqData: ReqChatbotData = {
        session: sessionPath,
        queryInput: {
          text: { text, languageCode },
        },
      };

      // google dialogflow response  data
      const { resData, isFallback, endInteraction } = await this.sessionClient
        .detectIntent(reqData)
        .then(this.#dialogFlowDataHandler)
        .catch((e) => {
          throw new InternalServerErrorException(
            'Internal Server Error - Google DialogFlow',
          );
        });

      if (isFallback) {
        // TODO
        // 답변이 없는 내용은 - ChatGPT에 요청? 예상중
      }

      return {
        status: 200,
        data: resData,
        sessionPath: endInteraction ? sessionPath : null,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
}
