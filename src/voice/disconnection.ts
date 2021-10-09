import { VoiceConnection } from "@discordjs/voice";
import { channelArray, guildArray } from "./wordsQue";

export function disconnect(connection:VoiceConnection, guildId:string){
    connection.disconnect()
    delete guildArray[guildId]
    delete channelArray[guildId]
}