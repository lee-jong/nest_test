import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class ChatbotRequestDataDTO {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  languageCode: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsOptional()
  @IsString()
  session_path?: string;
}

export class ChatbotResponseDataDTO {
  data = {};
  constructor(msg: FulfillmentMessagesData) {
    if (msg.platform == 'PLATFORM_UNSPECIFIED') {
      return this.#refineUnspecData(msg);
    }

    if (msg.platform == 'ACTIONS_ON_GOOGLE') {
      return this.#refineGAData(msg);
    }

    if (msg.platform == 'FACEBOOK') {
      return this.#refineFBData(msg);
    }

    this.data = msg;
  }

  #refineUnspecData(msg: FulfillmentMessagesData) {
    const { platform, message: type } = msg;
    let data: any = { platform, type };

    if (type == 'text') {
      data.text = msg.text.text[0];
    }

    if (type == 'payload') {
      const fields = msg.payload.fields;
      const fieldKeys = Object.keys(fields);
      if (fieldKeys.length) {
        fieldKeys.map((key) => {
          data.payload[key] = fields[key].stringValue;
        });
      }
    }

    return data;
  }

  #refineGAData(msg: FulfillmentMessagesData) {
    const { platform, message: type } = msg;
    let data: any = { platform, type };

    if (type == 'simpleResponses') {
      // TODO : TTS 필드 확인
      data.text = msg.simpleResponses.simpleResponses[0].displayText;
    }

    if (type == 'basicCard') {
      data.card = msg.basicCard;
    }

    if (type == 'carouselSelect') {
      data.items = msg.carouselSelect.items;
    }

    if (type == 'suggestions') {
      data.sugs = msg.suggestions.suggestions;
    }

    if (type == 'listSelect') {
      data.items = msg.listSelect.items;
    }

    if (type == 'browseCarouselCard') {
      data.items = msg.browseCarouselCard.items;
    }

    if (type == 'linkOutSuggestion') {
      data.sugs = msg.linkOutSuggestion;
    }

    return data;
  }

  #refineFBData(msg: FulfillmentMessagesData) {
    const { platform, message: type } = msg;
    let data: any = { platform, type };

    if (type == 'text') {
      data.text = msg.text.text[0];
    }

    if (type == 'image') {
      data.image = msg.image;
    }

    if (type == 'card') {
      data.items = msg.card;
    }

    if (type == 'quickReplies') {
      data.rep = msg.quickReplies;
    }

    return data;
  }
}
