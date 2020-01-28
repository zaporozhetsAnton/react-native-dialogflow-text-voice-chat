import React from 'react';
import {
  render,
  fireEvent,
  NativeTestEvent,
} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import Microphone from '../../components/Microphone';

describe('Microphone component renders microphone image, if the user press on it the onMicrophonePress callback will fire and app starts recording users voice', () => {
  test('test of callback and image when speechStarted equals tu true', () => {
    const mockedOnMicrophonePress = jest.fn();
    const {container, queryByTestId} = render(
      <Microphone onMicrophonePress={mockedOnMicrophonePress} speechStarted />,
    );
    expect(container).toContainElement(queryByTestId('microImage'));
    expect(container).toContainElement(queryByTestId('microWrapper'));
    expect(queryByTestId('microImage')).toHaveProp('source', {
      testUri: '../../../assets/micro-off.png',
    });
    fireEvent(queryByTestId('microWrapper'), new NativeTestEvent('press'));
    expect(mockedOnMicrophonePress).toBeCalledTimes(1);
  });
  test('test of image when speechStarted equals tu false', () => {
    const {queryByTestId} = render(
      <Microphone onMicrophonePress={() => null} speechStarted={false} />,
    );
    expect(queryByTestId('microImage')).toHaveProp('source', {
      testUri: '../../../assets/micro-on.png',
    });
  });
});
