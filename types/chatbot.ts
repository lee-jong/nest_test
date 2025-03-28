type ChatbotMessageType = 'text' | 'payload';

interface ChatbotResponseData {
  data: {
    fulfillmentMessages: FulfillmentMessagesData;
  };
}

type FulfillmentMessagesData =
  | FulfillmentMessagesTextData
  | FulfillmentMessagesPayloadData;

interface FulfillmentMessagesTextData {
  platform: string;
  text: {
    text: Array<string>;
  };

  message: ChatbotMessageType;
}

interface FulfillmentMessagesPayloadData {
  platform: string;
  payload: {
    fields: {
      url: {
        stringValue: string;
        kind: string;
      };
      name: {
        stringValue: string;
        kind: string;
      };
    };
  };
  message: ChatbotMessageType;
}
// outputContexts
interface OutputContextsData {
  name: string;
  lifespanCount: number;
  parameters: {
    fields: {
      'no-input': { numberValue: number; kind: string };
      'no-match': { numberValue: number; kind: string };
    };
  };
}

interface ReqChatbotData {
  session: string;
  queryInput: {
    text: { text: string; languageCode: string };
    event?: { name: string; languageCode: string };
  };
}
