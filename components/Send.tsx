import {Image, TouchableOpacity} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {createGiftedChatMessage, sendDialogFlowMessage} from '../utils';
import React from 'react';

import {setMessagesType} from '../utils';
import styles from './styles';

interface IProps {
  text: string;
  setMessages: setMessagesType;
  setText: (arg: string) => void;
}

const Send = ({text, setMessages, setText}: IProps) => {
  const onSendPress = () => {
    if (text.trim()) {
      const newDate = new Date();
      setMessages(prevMessages =>
        GiftedChat.append(
          prevMessages,
          createGiftedChatMessage(text, (newDate as unknown) as number),
        ),
      );
      sendDialogFlowMessage(text, setMessages);
      setText('');
    }
  };

  return (
    <TouchableOpacity
      style={styles.sendButton}
      onPress={onSendPress}
      testID="sendWrapper">
      <Image
        style={styles.sendImage}
        testID="sendImage"
        source={require('../assets/send.png')}
      />
    </TouchableOpacity>
  );
};

export default Send;
