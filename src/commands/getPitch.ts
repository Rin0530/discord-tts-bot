import {
    ApplicationCommandData,
    ChatInputCommandInteraction,
    Colors,
    CommandInteraction,
    EmbedBuilder,
    MessageFlags
} from "discord.js"
import * as db from "../db/database"
import { pitchArray } from "../util/arrays";

export const registerGetPitch: ApplicationCommandData = {
    name: "getpitch",
    description: "send Your Pitch"
}

export async function getpitch(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
        content: "処理中",
        flags: MessageFlags.Ephemeral,
    })

    const sender = interaction.user;
    const result = await db.getPitch(sender.id);
    const pitch = result == -100 ? sender.createdTimestamp % 400 / 10 - 20 : result;

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

    interaction.client.users.cache.each(async value => {
        pitchArray[value.id] = pitch
    })

    return interaction.editReply({
        embeds: [message],
        content: "true",
    })
}