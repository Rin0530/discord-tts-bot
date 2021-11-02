import * as voice from "@discordjs/voice"
import { Readable } from "stream";
import { guildArray, playerArray, TextQue } from './wordsQue'
import * as textToSpeech from '@google-cloud/text-to-speech'
import { configs } from '../configs'

const ttsClient = new textToSpeech.TextToSpeechClient({
    keyFilename: configs.credential
})


async function textToSpeechReadableStream(element:TextQue) {
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
  const stream = new Readable({ read() {} });
  stream.push(response.audioContent);
  return voice.createAudioResource(
    stream,
    {
      inlineVolume:true,
      inputType: voice.StreamType.OggOpus,
    });
}

export async function tts(){
  for(let guildID in guildArray){
    const connection = voice.getVoiceConnection(guildID);
    const player = playerArray[guildID].player;
    if(!connection || !player) continue;

    //前回のキュー
    const lastQue = guildArray[guildID][0];
    if(!lastQue || player.state.status == voice.AudioPlayerStatus.Playing) continue;
    guildArray[guildID].shift();

    connection.subscribe(player);
    const resource = await textToSpeechReadableStream(lastQue)
    player.play(resource)
  }
}
