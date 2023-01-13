import { 
    CommandInteraction,
    Colors,
    ApplicationCommandData,
    EmbedBuilder,
    ApplicationCommandOptionType
} from "discord.js"
import { registerWord } from "../db/database";
import { loadDeleteCommand } from "../util/loadDeleteCommand";

export const registerAddWord:ApplicationCommandData = {
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

export async function addword(interaction:CommandInteraction) {
    const clientUser = interaction.client.user
    const {guild, options} = interaction;
    const before = options.get("before", true).value;
    const after = options.get("after",true).value;
    if(!guild) return interaction.reply("this command is unable exclude textChannel!")

    const timeout = setTimeout(() => {
        interaction.editReply("エラー、やり直してください")
    }, 8000);
    await interaction.reply("処理中")
    if(!before || !after) return
    const result:boolean|null = await registerWord(guild, before.toString(), after.toString());
    const embed = new EmbedBuilder({
        author: {
            name: clientUser?.username
        },
        description: "登録成功。今後は",
        color: Colors.Blue,
        fields: [
            {
                name:before.toString(),
                value: "を",
                inline: true
            },
            {
                name: after.toString(),
                value: "として読み上げます",
                inline: true
            }
        ]
    })
    interaction.editReply(result ? {embeds: [embed]} : "エラー");
    clearTimeout(timeout)
    loadDeleteCommand(interaction.client)
}