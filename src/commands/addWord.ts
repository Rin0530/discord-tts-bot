import {
    CommandInteraction,
    Colors,
    ApplicationCommandData,
    EmbedBuilder,
    ApplicationCommandOptionType,
    ChatInputCommandInteraction
} from "discord.js"
import { registerWord } from "../db/database";
import { loadDeleteCommand } from "../util/loadDeleteCommand";

export const registerAddWord: ApplicationCommandData = {
    name: "addword",
    description: "replace words when this bot speak",
    options: [
        {
            name: "before",
            description: "before replacement word",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "after",
            description: "after replacement word",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ]
}

export async function addword(interaction: ChatInputCommandInteraction) {
    const clientUser = interaction.client.user
    if (!clientUser) return;
    const { guild, options } = interaction;
    const before = options.getString("before", true)
    const after = options.getString("after", true)
    if (!guild) return interaction.reply("this command is unable exclude textChannel!")

    await interaction.reply("処理中")

    const result: boolean = await registerWord(guild, before, after);
    const embed = new EmbedBuilder({
        author: {
            name: clientUser.username
        },
        description: "登録成功。今後は",
        color: Colors.Blue,
        fields: [
            {
                name: before,
                value: "を",
                inline: true
            },
            {
                name: after,
                value: "として読み上げます",
                inline: true
            }
        ]
    })
    interaction.editReply(result ? {
        embeds: [embed],
        content: ""
    } : "エラー");

    loadDeleteCommand(interaction.client)
}