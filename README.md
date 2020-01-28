# react-native-dialogflow-text-voice-chat

A react-native component that merges functionality of react-native-dialogflow, react-native-gifted-chat, react-native-tts and react-native-voice modules. Gives you the possibility to communicate with dialogflow by text and voice chat.

## Install

```shell
yarn add https://github.com/zaporozhetsAnton/dialogflow-text-voice-chat-react-native react-native-dialogflow react-native-gifted-chat react-native-tts react-native-voice

react-native link react-native-voice

react-native link react-native-tts

cd ios/ && pod install
```

Also, you need open the React Native xCode project and add two new keys into Info.plist https://github.com/innFactory/react-native-dialogflow#ios-important-xcode-plist-settings

## Configuration

You need to get JSON file with private key for enabling Chat component. https://dialogflow.com/docs/reference/v2-auth-setup

## Usage

```javascript
    import Chat from 'react-native-dialogflow-text-voice-chat'

    import { dialogFlowConfig } from './dialogflow' // dialogFlowConfig - js object created based on dialogflow JSON file created at Configuration step

    <Chat dialogFlowConfig={dialogFlowConfig} />
```
