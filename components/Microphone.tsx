import {Image, TouchableOpacity} from 'react-native';
import React from 'react';

import styles from '../styles';

const Microphone = ({
  onMicrophonePress,
  speechStarted,
}: {
  onMicrophonePress: () => void;
  speechStarted: boolean;
}) => {
  const src = speechStarted
    ? require('../assets/micro-off.png')
    : require('../assets/micro-on.png');

  return (
    <TouchableOpacity
      style={styles.microButton}
      onPress={onMicrophonePress}
      testID="microWrapper">
      <Image style={styles.microImage} testID="microImage" source={src} />
    </TouchableOpacity>
  );
};

export default Microphone;
