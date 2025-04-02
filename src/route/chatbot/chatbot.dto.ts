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
  data: any = {};
  constructor(msg: FulfillmentMessagesData) {
    if (msg.platform == 'PLATFORM_UNSPECIFIED') {
      this.#refineUnspecData(msg);
    }

    if (msg.platform == 'ACTIONS_ON_GOOGLE') {
      this.#refineGAData(msg);
    }

    if (msg.platform == 'FACEBOOK') {
      this.#refineFBData(msg);
    }

    // this.data = msg;
  }

  #refineUnspecData(msg: FulfillmentMessagesData) {
    const { platform, message: type } = msg;
    this.data = { platform, type };

    if (type == 'text') {
      this.data.text = msg.text.text[0];
      return;
    }

    if (type == 'payload') {
      const fields = msg.payload.fields;
      const fieldKeys = Object.keys(fields);
      if (fieldKeys.length) {
        fieldKeys.map((key) => {
          this.data.payload[key] = fields[key].stringValue;
        });
      }
    }
  }

  #refineGAData(msg: FulfillmentMessagesData) {
    const { platform, message: type } = msg;
    this.data = { platform, type };

    if (type == 'simpleResponses') {
      // TODO : TTS 필드 확인
      this.data.text = msg.simpleResponses.simpleResponses[0].displayText;
      return;
    }

    if (type == 'basicCard') {
      this.data.card = msg.basicCard;
      return;
    }

    if (type == 'carouselSelect') {
      this.data.items = msg.carouselSelect.items;
      return;
    }

    if (type == 'suggestions') {
      this.data.sugs = msg.suggestions.suggestions;
      return;
    }

    if (type == 'listSelect') {
      this.data.items = msg.listSelect.items;
      return;
    }

    if (type == 'browseCarouselCard') {
      this.data.items = msg.browseCarouselCard.items;
      return;
    }

    if (type == 'linkOutSuggestion') {
      this.data.sugs = msg.linkOutSuggestion;
      return;
    }
  }

  #refineFBData(msg: FulfillmentMessagesData) {
    const { platform, message: type } = msg;
    this.data = { platform, type };

    if (type == 'text') {
      this.data.text = msg.text.text[0];
      return;
    }

    if (type == 'image') {
      this.data.image = msg.image;
      return;
    }

    if (type == 'card') {
      this.data.items = msg.card;
      return;
    }

    if (type == 'quickReplies') {
      this.data.rep = msg.quickReplies;
      return;
    }
  }
}
