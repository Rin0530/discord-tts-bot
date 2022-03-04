import { ApplicationCommandData, CommandInteraction, InteractionReplyOptions, MessageEmbed } from "discord.js"
import * as db from "../db/database"

export const registerGetPitch:ApplicationCommandData = {
    name: "getpitch",
    description: "send Your Pitch",
    options: []
}

export async function getpitch(interaction:CommandInteraction) {
    const sender = interaction.user;
    const result = await db.getPitch(sender.id);
    const pitch = result == -100 ? sender.createdTimestamp %400 /10 -20 : result;
    
    const message = new MessageEmbed({
        author: {
            name: interaction.client.user?.username
        },
        color: "DARK_BLUE",
        fields: [
            {
                name: "あなたのテキストは",
                value: `**pitch ${pitch}で読み上げます**`,
                inline: true
            }
        ]
    });
    const replyOption:InteractionReplyOptions = {embeds:[message], ephemeral:true}
    return interaction.reply(replyOption)
}