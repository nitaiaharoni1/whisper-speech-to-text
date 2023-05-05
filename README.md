# Whisper Speech-to-Text

Whisper Speech-to-Text is a JavaScript library that allows you to record audio from a user's microphone, and then transcribe the audio into text using OpenAI's Whisper ASR system. This library is designed to be used in web applications.

## Installation

```bash
npm i whisper-speech-to-text
```

## Usage

First, import the `WhisperSTT` class from the library:

```javascript
import { WhisperSTT } from 'whisper-speech-to-text';
```

Then, create a new instance of the `WhisperSTT` class, passing your OpenAI API key to the constructor:

```javascript
const whisper = new WhisperSTT('your-openai-api-key');
```

You can then start recording audio:

```javascript
await whisper.startRecording();
```

If you want to pause the recording, you can do so:

```javascript
await whisper.pauseRecording();
```

And then resume it:

```javascript
await whisper.resumeRecording();
```

When you're done recording, you can stop it and get the transcription:

```javascript
await whisper.stopRecording((text) => {
  console.log('Transcription:', text);
});
```

## API

The `WhisperSTT` class has the following methods:

- `startRecording()`: Starts recording audio from the user's microphone.
- `pauseRecording()`: Pauses the current recording.
- `resumeRecording()`: Resumes a paused recording.
- `stopRecording(onFinish: (text: string) => void)`: Stops the current recording and transcribes the audio into text. The transcription is passed to the `onFinish` callback.

## Error Handling

If an error occurs during recording or transcription, the methods will throw an error. Be sure to use try/catch blocks to handle these errors in your application.

## Requirements

This library uses the `navigator.mediaDevices.getUserMedia` API to record audio, which is supported in all modern browsers but not in Internet Explorer. Users must also grant permission for the web application to access their microphone.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please read the contributing guidelines before getting started.

## Disclaimer

This library is not officially associated with OpenAI. Please use responsibly and ensure that your use case complies with OpenAI's use case policy.

## Support

If you encounter any problems or have any questions, please open an issue on the GitHub repository.