import React, {useState, useEffect, memo} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
// @ts-ignore
import Voice from 'react-native-voice';
import {View} from 'react-native';

import {
  setDefaultVoice,
  initializeDialogFlow,
  IDialogFlowConfig,
} from '../utils';
import {useRecordingCheck} from '../utils/hooks';
import styles from './styles';
import Send from './Send';
import Microphone from './Microphone';

interface IProps {
  dialogFlowConfig: IDialogFlowConfig;
}

const Chat = memo(({dialogFlowConfig}: IProps) => {
  useEffect(() => {
    initializeDialogFlow(dialogFlowConfig);
    setDefaultVoice();
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [dialogFlowConfig]);

  const [text, setText] = useState<string>('');
  const [speechStarted, setSpeechStarted] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const SendButton = Send.bind(null, {text, setMessages, setText});

  const onSpeechStart = () => {
    setSpeechStarted(true);
  };

  const onSpeechEnd = () => {
    setSpeechStarted(false);
  };

  const onSpeechResults = async (e: {value: string[]}) => {
    if (e && e.value && e.value[0]) {
      setText(e.value[0]);
    }
  };

  const stopRecording = () => {
    if (!text) {
      Voice.cancel();
    } else {
      Voice.stop();
    }
    setSpeechStarted(false);
  };

  useRecordingCheck(text, stopRecording, speechStarted);

  const onMicrophonePress = () => {
    if (speechStarted) {
      stopRecording();
    } else {
      Voice.start('en-US');
    }
  };

  const onFocus = () => {
    if (speechStarted) {
      stopRecording();
    }
  };

  return (
    <View style={styles.wrapper}>
      <GiftedChat
        messages={messages}
        user={{
          _id: 1,
        }}
        textInputProps={{
          keyboardType: 'email-address',
          onFocus,
        }}
        // @ts-ignore
        textInputStyle={styles.textInputStyle}
        text={text}
        onInputTextChanged={setText}
        renderSend={() => null}
        renderActions={SendButton}
      />
      <Microphone
        onMicrophonePress={onMicrophonePress}
        speechStarted={speechStarted}
      />
    </View>
  );
});

export default Chat;
