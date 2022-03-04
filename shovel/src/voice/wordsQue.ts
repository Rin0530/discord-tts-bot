import { AudioPlayer } from "@discordjs/voice";
import { Channel, Message } from "discord.js";
import { getPitch, getWords, registerPitch } from "../db/database";


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
    const result = await getPitch(message.author.id);
    const defaultPitch = message.author.createdTimestamp %400 /10 -20
    if(result == -100)
        registerPitch(message.author.id, defaultPitch);

    let text = await replace(message.content, guildId);
    text = regrep(text);
    guildArray[guildId].push(new TextQue(text,result != -100? result: defaultPitch));
}

function regrep(message:string){
    let text = message.replace(/https?:\/\/\S*/,"");    //URLを読み飛ばす
    text = text.replace(/<a?:.*?:\d+>/,"");     //カスタム絵文字を読み飛ばす
    text = text.replace(/[^\w０-９あ-んア-ンぁ-ょｱ-ﾝｦ-ﾟ\-ー\u4E00-\u9FFF]/g,"");      //数字、半角英字、ひらがな、カタカナ、半角カタカナ、漢字以外を読み飛ばす
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