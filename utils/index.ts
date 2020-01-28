// @ts-ignore
import Tts from 'react-native-tts';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {useEffect, useRef} from 'react';
import uuid from 'uuid';

export const createGiftedChatMessage = (
  text: string,
  createdAt: number | Date,
  userId: number = 1,
): IMessage[] => [
  {
    _id: uuid.v1(),
    text,
    createdAt,
    user: {
      _id: userId,
    },
  },
];

export interface IDialogFlowConfig {
  type?: string;
  project_id: string;
  private_key_id?: string;
  private_key: string;
  client_email: string;
  client_id?: string;
  auth_uri?: string;
  token_uri?: string;
  auth_provider_x509_cert_url?: string;
  client_x509_cert_url?: string;
}

export const initializeDialogFlow = (dialogFlowConfig: IDialogFlowConfig) => {
  Dialogflow_V2.setConfiguration(
    dialogFlowConfig.client_email,
    dialogFlowConfig.private_key,
    Dialogflow_V2.LANG_ENGLISH,
    dialogFlowConfig.project_id,
  );
};

export const setDefaultVoice = async () => {
  const voices: {language: string; id: string}[] = await Tts.voices();
  let voiceOptions = voices.filter(voice => voice.language.match(/(en-US)/));
  if (voiceOptions.length > 0) {
    Tts.setDefaultVoice(voiceOptions[0].id);
  }
};

export type setMessagesType = (
  func: (prevMessages: IMessage[]) => IMessage[],
) => void;

export const sendDialogFlowMessage = async (
  text: string = 'Hello',
  callback: setMessagesType,
) => {
  await Dialogflow_V2.requestQuery(
    text,
    result => {
      if (result && result.queryResult && result.queryResult.fulfillmentText) {
        Tts.getInitStatus().then(() => {
          Tts.speak(result.queryResult.fulfillmentText);
        });
        const newDate = new Date();
        callback(prevMessages =>
          GiftedChat.append(
            prevMessages,
            createGiftedChatMessage(
              result.queryResult.fulfillmentText,
              (newDate as unknown) as number,
              2,
            ),
          ),
        );
      }
      console.log('Dialogflow result:', result);
    },
    error => {
      console.log('Dialogflow error request: ' + JSON.stringify(error));
    },
  );
};

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(() => {});
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
