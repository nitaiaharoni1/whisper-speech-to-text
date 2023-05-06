# Whisper Speech-to-Text

Whisper Speech-to-Text is a JavaScript library that allows you to record audio from a user's microphone, and then
transcribe the audio into text using OpenAI's Whisper ASR system. This library is designed to be used in web
applications.

## Features

- Real-time transcription of speech to text using OpenAI's Whisper ASR system.
- Easy to use API for starting, pausing, resuming, and stopping recordings.
- Automatic handling of microphone permissions and audio recording.

## Installation

```bash
npm i whisper-speech-to-text
```

## Usage

```typescript
// Import the WhisperSTT class from the library
import { WhisperSTT } from "whisper-speech-to-text";

// Create a new instance of the WhisperSTT class, passing your OpenAI API key to the constructor
const whisper = new WhisperSTT("your-openai-api-key");

// Start recording audio
await whisper.startRecording();

// Pause the recording
await whisper.pauseRecording();

// Resume the recording
await whisper.resumeRecording();

// Stop the recording and get the transcription
await whisper.stopRecording((text) => {
  console.log("Transcription:", text);
});
```

## API

The `WhisperSTT` class has the following methods:

- `startRecording()`: Starts recording audio from the user's microphone.
- `pauseRecording()`: Pauses the current recording.
- `resumeRecording()`: Resumes a paused recording.
- `stopRecording(onFinish: (text: string) => void)`: Stops the current recording and transcribes the audio into text.
  The transcription is passed to the `onFinish` callback.

## Contributing

Contributions to this project are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your fork to your local machine.
3. Create a new branch for your changes.
4. Make your changes and commit them to your branch.
5. Push your changes to your fork on GitHub.
6. Open a pull request from your branch to the main repository.

## Disclaimer

This library is not officially associated with OpenAI. Please use responsibly and ensure that your use case complies
with OpenAI's use case policy.

## Support

If you encounter any problems or have any questions, please open an issue on the GitHub repository.
