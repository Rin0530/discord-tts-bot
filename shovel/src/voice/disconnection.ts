import { VoiceConnection } from "@discordjs/voice";
import { playerArray, guildArray } from "./wordsQue";

export function disconnect(connection:VoiceConnection, guildId:string){
    connection.disconnect()
    delete guildArray[guildId]
    delete playerArray[guildId]
}