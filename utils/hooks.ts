import {useInterval} from './index';

type recordingCheckType = (
  newText: string,
  callback: () => void,
  speechStarted: boolean,
) => void;

export const useRecordingCheck: recordingCheckType = (
  newText,
  callback,
  speechStarted,
) => {
  let oldText: string;

  useInterval(
    () => {
      if (newText && oldText === newText) {
        callback();
      } else if (newText) {
        oldText = newText;
      }
    },
    speechStarted ? 2000 : null,
  );
};
