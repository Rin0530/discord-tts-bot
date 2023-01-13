import { ApplicationCommandData, Colors, CommandInteraction, InteractionReplyOptions, EmbedBuilder } from "discord.js"
import * as db from "../db/database"
import { pitchArray } from "../util/arrays";

export const registerGetPitch:ApplicationCommandData = {
    name: "getpitch",
    description: "send Your Pitch",
    options: []
}

export async function getpitch(interaction:CommandInteraction) {
    const sender = interaction.user;
    const result = await db.getPitch(sender.id);
    const pitch = result == -100 ? sender.createdTimestamp %400 /10 -20 : result;
    
    const message = new EmbedBuilder({
        author: {
            name: interaction.client.user?.username
        },
        color: Colors.DarkBlue,
        fields: [
            {
                name: "あなたのテキストは",
                value: `**pitch ${pitch}で読み上げます**`,
                inline: true
            }
        ]
    });

    interaction.client.users.cache.each( async value => {
        pitchArray[value.id] = pitch        
    })
    const replyOption:InteractionReplyOptions = {embeds:[message], ephemeral:true}
    
    return interaction.reply(replyOption)
}