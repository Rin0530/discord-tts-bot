import { AudioPlayer } from "@discordjs/voice";
import { Channel, Message } from "discord.js";
import { getPitch, getWords } from "../db/database";


export const guildArray:{
    [guildId:string]: TextQue[]
} = {}

export const playerArray:{
    [guildID:string]: PLayerOptions
} = {}

export class TextQue{
    public text:string;
    public pitch:number;
    public constructor(text:string, pitch:number){
        this.text = text;
        this.pitch = pitch;
    }
}

export class PLayerOptions{
    public channel:Channel;
    public player:AudioPlayer;
    public constructor(channel:Channel, player:AudioPlayer){
        this.channel = channel;
        this.player = player;
    }
}

export async function addQue(message: Message){
    if(message.content.startsWith(";") || message.content.startsWith("；"))
        return
    const guildId = message.guildId;
    if(!guildId || (!guildArray[guildId])) return;
    if(message.channel != playerArray[guildId].channel) return;
    const pitch = await getPitch(message.author.id);
    const secondsPitch = message.author.createdTimestamp %400 /10 -20;

    let text = await replace(message.content, guildId);
    text = regrep(text);
    guildArray[guildId].push(new TextQue(text,pitch != -100? pitch: secondsPitch));
}

function regrep(message:string){
    let text = message.replace(/https?:\/\/\S*/,"");
    text = text.replace(/<a?:.*?:\d+>/,"");
    text = text.replace(/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/,"");
    text = text.replace("\([^あ-ん\u30A1-\u30F4\u2E80-\u2FDF\u3005-\u3007\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\U00020000-\U0002EBEF]+?\)","")
    return text;
}

async function replace(message:string, guildId:string):Promise<string>{
    const result = await getWords(guildId);
    return new Promise(resolv => {
        let text = message;
        for(let before in result) 
            text = text.split(before).join(result[before])
        resolv(text);
    })
}