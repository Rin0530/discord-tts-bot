import { AudioPlayer } from "@discordjs/voice";
import { Channel, Message } from "discord.js";
import { getPitch, registerPitch } from "../db/database";
import { guildArray, pitchArray, playerArray, wordsArray } from "../util/arrays";
import { play } from "./tts";

export class TextQue {
    public text: string;
    public pitch: number;
    public constructor(text: string, pitch: number) {
        this.text = text;
        this.pitch = pitch;
    }
}

export class PLayerOptions {
    public channel: Channel;
    public player: AudioPlayer;
    public constructor(channel: Channel, player: AudioPlayer) {
        this.channel = channel;
        this.player = player;
    }
}

export async function addQue(message: Message) {
    if (message.content.startsWith(";") || message.content.startsWith("；"))
        return
    const guildId = message.guildId;
    if (!guildId || (!guildArray[guildId])) return;
    if (message.channel != playerArray[guildId].channel) return;
    if (!pitchArray[message.author.id]) {
        const result = await getPitch(message.author.id);
        const defaultPitch = message.author.createdTimestamp % 400 / 10 - 20
        await registerPitch(message.author.id, result != -100 ? result : defaultPitch);
    }

    let text = await replace(message.content, guildId);
    text = regrep(text);

    guildArray[guildId].push(new TextQue(text, pitchArray[message.author.id]));

    play(guildId)
}

function regrep(message: string) {
    let text = message.replace(/https?:\/\/\S*/, "");    //URLを読み飛ばす
    text = text.replace(/<a?:.*?:\d+>/, "");     //カスタム絵文字を読み飛ばす
    text = text.replace(/(\d{4})\/(\d{1,2})\/(\d{1,2})/g, "$1年$2月$3日")    //年月日に置換
    text = text.replace(/(\d{1,2})\/(\d{1,2})/g, "$1月$2日")    //月日に置換
    text = text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
        return String.fromCharCode(
            s.charCodeAt(0) - 65248
        );
    })    // 全角英数文字を半角に変換
    text = text.replace(/[^\wぁ-ゖァ-ヶㇰ-ㇿｦ-ﾝ\-ー\u4E00-\u9FFF]/g, "");      //数字、半角英字、ひらがな、カタカナ、半角カタカナ、漢字以外を読み飛ばす
    return text;
}

async function replace(message: string, guildId: string): Promise<string> {
    const result = wordsArray[guildId]
    let text = message;

    result.forEach(value => {
        for (let before in value)
            text = text.split(before).join(value[before])
    })

    return text
}