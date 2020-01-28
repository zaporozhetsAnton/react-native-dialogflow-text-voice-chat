import {
  initializeDialogFlow,
  createGiftedChatMessage,
  setDefaultVoice,
  sendDialogFlowMessage,
} from '../../utils';

const mockedSetConfiguration = jest.fn();
const mockedRequestQuery = jest.fn();
jest.mock('react-native-dialogflow', () => ({
  Dialogflow_V2: {
    setConfiguration: jest.fn(() => mockedSetConfiguration()),
    requestQuery: jest.fn(() => mockedRequestQuery()),
  },
}));

jest.mock('uuid', () => ({
  v1: jest.fn(() => 'testId'),
}));

const mockedSetDefaultVoice = jest.fn();
jest.mock('react-native-tts', () => ({
  voices: jest.fn(() => {
    return new Promise(resolve =>
      resolve([
        {language: 'lorem', id: 0},
        {language: 'ipsum', id: 1},
        {language: 'en-US', id: 2},
      ]),
    );
  }),
  setDefaultVoice: jest.fn((...args) => mockedSetDefaultVoice(...args)),
}));

test('createGiftedChatMessage function creates an array with one new message object with needed structure for react-native-gifted-chat', () => {
  expect(createGiftedChatMessage('lorem ipsum', 87, 1)).toEqual([
    {
      _id: 'testId',
      createdAt: 87,
      text: 'lorem ipsum',
      user: {_id: 1},
    },
  ]);
  expect(createGiftedChatMessage('second lorem ipsum', 6, 2)).toEqual([
    {
      _id: 'testId',
      createdAt: 6,
      text: 'second lorem ipsum',
      user: {_id: 2},
    },
  ]);
  expect(createGiftedChatMessage('third lorem ipsum', 10)).toEqual([
    {
      _id: 'testId',
      createdAt: 10,
      text: 'third lorem ipsum',
      user: {_id: 1},
    },
  ]);
});

test('initializeDialogFlow function runs Dialogflow_V2.setConfiguration function after what you can use Dialogflow_V2', () => {
  initializeDialogFlow({
    client_email: 'lorem',
    private_key: 'ipsum',
    project_id: 'lorem ipsum',
  });
  expect(mockedSetConfiguration).toBeCalledTimes(1);
});

test('setDefaultVoice function gets a list of locally available voices and uses first English one', async () => {
  await setDefaultVoice();
  expect(mockedSetDefaultVoice).toBeCalledWith(2);
});

test('sendDialogFlowMessage sends message to dialogflow by calling Dialogflow_V2.requestQuery method', () => {
  sendDialogFlowMessage('lorem ipsum', () => null);
  expect(mockedRequestQuery).toBeCalledTimes(1);
});
