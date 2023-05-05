import { RecordRTCPromisesHandler } from 'recordrtc';
import axios from 'axios';

const AUDIO_TYPE = 'audio';
const MODEL = 'whisper-1';
const TRANSCRIPTIONS_API_URL = 'https://api.openai.com/v1/audio/transcriptions';

export class WhisperSTT {
  private readonly apiKey: string;
  private recorder: RecordRTCPromisesHandler | null;
  private stream: MediaStream | null;
  public isRecording: boolean;
  public isStopped: boolean;
  public isPaused: boolean;

  constructor(apiKey: string) {
    this.recorder = null;
    this.stream = null;
    this.isRecording = false;
    this.isStopped = true;
    this.isPaused = false;
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.apiKey = apiKey;
  }

  public pauseRecording = async (): Promise<void> => {
    if (!this.recorder) {
      throw new Error('Cannot pause recording: no recorder');
    }
    await this.recorder.pauseRecording();
    this.isPaused = true;
    this.isRecording = false;
  };

  public resumeRecording = async (): Promise<void> => {
    if (!this.recorder) {
      throw new Error('Cannot resume recording: no recorder');
    }
    await this.recorder.resumeRecording();
    this.isPaused = false;
    this.isRecording = true;
  };

  public startRecording = async (): Promise<void> => {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recorder = new RecordRTCPromisesHandler(this.stream, {
        type: AUDIO_TYPE,
      });
      this.recorder.startRecording();
      this.isRecording = true;
      this.isStopped = false;
    } catch (error: any) {
      this.isRecording = false;
      this.isStopped = true;
      throw new Error(`Error starting recording: ${error.message}`);
    }
  };

  public stopRecording = async (onFinish: (text: string) => void): Promise<void> => {
    if (!this.isRecording || !this.recorder) {
      throw new Error('Cannot stop recording: no recorder');
    }
    try {
      await this.recorder.stopRecording();
      const blob = await this.recorder.getBlob();
      this.transcribe(blob, onFinish);
      this.stream?.getTracks().forEach((track) => {
        track.stop();
      });
      this.recorder = null;
      this.stream = null;
      this.isRecording = false;
      this.isStopped = true;
      this.isPaused = false;
    } catch (error: any) {
      this.isRecording = false;
      this.isStopped = true;
      throw new Error(`Error stopping recording: ${error.message}`);
    }
  };

  private readonly transcribe = async (audioBlob: Blob, onFinish: (text: string) => void): Promise<void> => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');
    formData.append('model', MODEL);

    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'multipart/form-data',
    };
    try {
      const response = await axios.post<{ text: string }>(TRANSCRIPTIONS_API_URL, formData, {
        headers,
      });
      onFinish(response.data?.text || '');
    } catch (error: any) {
      console.error('Error transcribing audio:', error);
    }
  };
}
