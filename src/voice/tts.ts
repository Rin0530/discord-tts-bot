import * as voice from "@discordjs/voice"
import { Readable } from "stream";
import * as textToSpeech from '@google-cloud/text-to-speech'
import { configs } from '../configs'
import { TextQue } from "./wordsQue";
import { guildArray, playerArray } from "../util/arrays";

const ttsClient = new textToSpeech.TextToSpeechClient({
    keyFilename: configs.credential
})

async function textToSpeechReadableStream(elements:TextQue[]) { 
  const stream = new Readable({ read() {} }); 
  elements.forEach(async (element) => {
    const text = element.text;
    const pitch = element.pitch;
    const request:textToSpeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
      input: {text},
      voice: {
        languageCode: 'ja-JP',
        name: 'ja-JP-Wavenet-A'
      },
      audioConfig: {
        audioEncoding: 'OGG_OPUS',
        speakingRate: 1.2,
        pitch: pitch
      }
    };
    const [response] = await ttsClient.synthesizeSpeech(request);
    stream.push(response.audioContent);
  })  
  
  return voice.createAudioResource(
    stream,
    {
      inlineVolume:true,
      inputType: voice.StreamType.OggOpus,
      metadata: Date.now()
    });
}

export async function tts(guild_id:string){
  const connection = voice.getVoiceConnection(guild_id);
  const player = playerArray[guild_id]?.player;
  if(!connection || !player) return;

  connection.subscribe(player);
  const textQues = guildArray[guild_id]
  guildArray[guild_id] = []
  const resource = await textToSpeechReadableStream(textQues)
  player.play(resource)
}

export async function play(guild_id:string){
  const player = playerArray[guild_id]?.player;
  if(!player) return;

  if(guildArray[guild_id].length == 1 &&
      player.state.status == voice.AudioPlayerStatus.Idle ||
      player.state.status == voice.AudioPlayerStatus.Buffering )
    tts(guild_id)
}
