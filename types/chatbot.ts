interface ReqChatbotData {
  session: string;
  queryInput: {
    text: { text: string; languageCode: string };
    event?: { name: string; languageCode: string };
  };
}
interface ChatbotResponseData {
  data: {
    fulfillmentMessages: FulfillmentMessagesData;
  };
}

type FulfillmentMessagesData =
  | UnspecTextMegData
  | UnspecPayloadMsgData
  | GACarouselSelectData
  | GASuggestionsData
  | GASimpleResponsesData
  | GABasicCardData
  | GABrowseCarouselData
  | GAListData
  | GALinkOutSuggestionData
  | FBTextData
  | FBImageData
  | FBCardData
  | FBQuickRepliesData;

// DF Message platform - PLATFORM_UNSPECIFIED

interface ChatbotDefaultData {
  platform: string;
  message: string;
}

interface UnspecTextMegData {
  platform: 'PLATFORM_UNSPECIFIED';
  message: 'text';
  text: {
    text: Array<string>;
  };
}

interface UnspecPayloadMsgData {
  platform: 'PLATFORM_UNSPECIFIED';
  message: 'payload';
  payload: {
    fields: {
      [key: string]: {
        stringValue: string;
        kind: string;
      };
    };
  };
}

// DF Message platform - Google Assistant
interface GACarouselSelectData {
  platform: 'ACTIONS_ON_GOOGLE';
  message: 'carouselSelect';
  carouselSelect: {
    items: Array<{ info: { key: string; synonyms: Array<any> } }>;
    title: string;
    description: string;
    image: {
      imageUri: string;
      accessibilityText: string;
    };
  };
}

interface GASuggestionsData {
  platform: 'ACTIONS_ON_GOOGLE';
  message: 'suggestions';
  suggestions: { suggestions: Array<{ title: string }> };
}

interface GASimpleResponsesData {
  platform: 'ACTIONS_ON_GOOGLE';
  message: 'simpleResponses';
  simpleResponses: {
    simpleResponses: Array<{
      textToSpeech: string;
      ssml: string;
      displayText: string;
    }>;
  };
}

interface GABasicCardData {
  platform: 'ACTIONS_ON_GOOGLE';
  message: 'basicCard';
  basicCard: {
    title: string;
    subTitle: string;
    formattedText: string;
    image: {
      imageUri: string;
      accessibilityText: string;
    };
    buttons: Array<{ title: string; openUriAction: { uri: string } }>;
  };
}

interface GAListData {
  platform: 'ACTIONS_ON_GOOGLE';
  message: 'listSelect';
  listSelect: {
    items: Array<{
      info: {
        synonyms: Array<any>;
        key: 'string';
      };
      title: string;
      description: string;
      image: {
        imageUri: string;
        accessibilityText: string;
      };
    }>;
  };
}

interface GABrowseCarouselData {
  platform: 'ACTIONS_ON_GOOGLE';
  message: 'browseCarouselCard';
  browseCarouselCard: {
    items: Array<{
      openUriAction: {
        url: string;
        urlTypeHint: 'AMP_CONTENT' | 'URL_TYPE_HINT_UNSPECIFIED';
      };
      title: string;
      description: string;
      image: {
        imageUri: string;
        accessibilityText: string;
      };
      foorter: string;
    }>;
  };
}

interface GALinkOutSuggestionData {
  platform: 'ACTIONS_ON_GOOGLE';
  message: 'linkOutSuggestion';
  linkOutSuggestion: {
    destinationName: string;
    uri: string;
  };
}

interface GAMediaContentData {
  platform: 'ACTIONS_ON_GOOGLE';
  message: 'mediaContent';
  mediaContent: {
    mediaObjects: Array<{
      name: string;
      description: string;
      contentUri: {
        imageUri: string;
        accessibilityText: string;
      };
      image: string;
    }>;
    mediaType: string;
  };
}

interface GATableCardData {
  platform: 'ACTIONS_ON_GOOGLE';
  message: 'mediaContent';
  tableCard: {
    columnProperties: Array<{
      header: string;
      horizontalAlignment: 'LEADING' | 'CENTER' | 'TRAILING';
    }>;
    rows: Array<{
      cells: Array<{ text: string }>;
      dividerAfter: boolean;
    }>;
    buttons: Array<{
      title: string;
      openUriAction: {
        uri: string;
      };
    }>;
    title: string;
    subTitle: string;
    image: {
      imageUri: string;
      accessibilityText: string;
    };
  };
}

// DF Message platform - FaceBook
interface FBTextData {
  platform: 'FACEBOOK';
  message: 'text';
  text: {
    text: Array<string>;
  };
}

interface FBImageData {
  platform: 'FACEBOOK';
  message: 'image';
  image: {
    imageUri: string;
    accessibilityText: string;
  };
}

interface FBCardData {
  platform: 'FACEBOOK';
  message: 'card';
  card: {
    title: string;
    subtitle: string;
    imageUri: string;
    buttons: Array<{ text: string; postback: string }>;
  };
}

interface FBQuickRepliesData {
  platform: 'FACEBOOK';
  message: 'quickReplies';
  quickReplies: {
    title: string;
    quickReplies: Array<string>;
  };
}
