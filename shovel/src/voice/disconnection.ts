import { VoiceConnection } from "@discordjs/voice";
import { guildArray, playerArray } from "./wordsQue";

export function disconnect(connection:VoiceConnection, guildId:string){
    connection.disconnect()
    delete guildArray[guildId]
    delete playerArray[guildId]
}