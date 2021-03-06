import { CommandInteraction, ApplicationCommandData, MessageEmbed } from "discord.js"
import { registerWord } from "../db/database";
import { loadDeleteCommand } from "../util/loadDeleteCommand";

export const registerAddWord:ApplicationCommandData = {
    name: "addword",
    description: "replace words when this bot speak",
    options: [
        {
            name: "before",
            description: "before replacement word",
            type: "STRING",
            required: true,
        },
        {
            name: "after",
            description: "after replacement word",
            type: "STRING",
            required: true
        }
    ]
}

export async function addword(interaction:CommandInteraction) {
    const clientUser = interaction.client.user
    const {guild, options} = interaction;
    const before = options.getString("before", true);
    const after = options.getString("after",true);
    if(!guild) return interaction.reply("this command is unable exclude textChannel!")

    const timeout = setTimeout(() => {
        interaction.editReply("エラー、やり直してください")
    }, 8000);
    await interaction.reply("処理中")

    const result:boolean|null = await registerWord(guild, before, after);
    const embed = new MessageEmbed({
        author: {
            name: clientUser?.username
        },
        description: "登録成功。今後は",
        color: "BLUE",
        fields: [
            {
                name:before,
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
    interaction.editReply(result ? {embeds: [embed]} : "エラー");
    clearTimeout(timeout)
    loadDeleteCommand(interaction.client)
}