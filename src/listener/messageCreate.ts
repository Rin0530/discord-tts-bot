import { Message } from "discord.js";
import { addQue } from "../voice/wordsQue";

export async function onMessageCreate(message: Message) {
    if (message.interactionMetadata)
        return;
    await addQue(message)
}