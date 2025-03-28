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

export class ChatbotResTextDataDTO {
  context_name?: string;
  text: Array<string>;
  constructor(data: FulfillmentMessagesTextData) {
    this.text = data.text.text;
  }
}

export class ChatbotResPayloadDataDTO {
  url?: string;
  name?: string;
  context_name?: string;
  constructor(data: FulfillmentMessagesPayloadData) {
    Object.keys(data.payload.fields).map((key) => {
      this[key] = data.payload.fields[key].stringValue;
    });
  }
}
