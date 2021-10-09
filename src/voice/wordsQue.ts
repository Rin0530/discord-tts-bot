import { AudioPlayer, createAudioPlayer } from "@discordjs/voice";
import { Channel } from "discord.js";


export const guildArray:{
    [guildId:string]: TextQue[]
} = {}

export const channelArray:{
    [guildId:string]: Channel
} = {}

export const playerArray:{
    [guildID:string]: AudioPlayer
} = {}

export class TextQue{
    public text:string;
    public pitch:number;
    public constructor(text:string, pitch:number){
        this.text = text;
        this.pitch = pitch %400 /10 -20;
    }
}
