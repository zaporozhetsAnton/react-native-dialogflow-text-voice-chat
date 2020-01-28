import React from 'react';
import {
  render,
  fireEvent,
  NativeTestEvent,
} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import Send from '../../components/Send';

const mockedSendDialogFlowMessage = jest.fn();
jest.mock('react-native-gifted-chat');
jest.mock('../../utils', () => {
  return {
    sendDialogFlowMessage: jest.fn(() => mockedSendDialogFlowMessage()),
  };
});

test('test of Send component, it renders button, when user preses on it calls three functions: setMessages - adding new message to chat, sendDialogFlowMessage - sends message to dialogflow server, setText - cleares input of chat', () => {
  const mockedSendMessages = jest.fn();
  const mockedSendText = jest.fn();
  const {queryByTestId, container} = render(
    <Send
      text="lorem ipsum"
      setMessages={mockedSendMessages}
      setText={mockedSendText}
    />,
  );
  expect(container).toContainElement(queryByTestId('sendWrapper'));
  expect(container).toContainElement(queryByTestId('sendImage'));
  fireEvent(queryByTestId('sendWrapper'), new NativeTestEvent('press'));
  expect(mockedSendMessages).toBeCalledTimes(1);
  expect(mockedSendDialogFlowMessage).toBeCalledTimes(1);
  expect(mockedSendText).toBeCalledTimes(1);
});
