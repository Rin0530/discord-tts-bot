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
    const guildId = message.guildId;
    if(!guildId || (!guildArray[guildId])) return;
    if(message.channel != playerArray[guildId].channel) return;
    const pitch = await getPitch(message.author.id);
    const secondsPitch = message.author.createdTimestamp %400 /10 -20;

    let text = regrep(message.content);
    text = await replace(text, guildId);
    guildArray[guildId].push(new TextQue(text,pitch != -100? pitch: secondsPitch));
}

function regrep(message:string){
    let text = message.replace(/'https?:\/\/\S*'/,"");
    //text = text.replace(/'<a?:.*?:\d+>'/,"");
    return text;
}

async function replace(message:string, guildId:string):Promise<string>{
    const res = await getWords(guildId);
    return new Promise(resolv => {
        let text = message;
        if(res != ""){
            //レスポンスをjson形式にパース
            const result:{[key:string]: string;} = {};
            for(let v of res) result[v.before] = v.after;

            for(let before in result) 
                text = text.replace(before, result[before]);
        }
        resolv(text);
    })
}