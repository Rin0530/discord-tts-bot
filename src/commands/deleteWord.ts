import {
    ApplicationCommandData,
    ApplicationCommandOptionChoiceData,
    CommandInteraction,
    Colors,
    EmbedBuilder
} from "discord.js"
import { ApplicationCommandOptionType } from "discord-api-types/v10"
import { deleteWord, getWords } from "../db/database";
import { loadDeleteCommand } from "../util/loadDeleteCommand";

export async function registerDeleteWordForGuild(guildId: string): Promise<ApplicationCommandData> {
    const words = await getWords(guildId);
    const choices: ApplicationCommandOptionChoiceData<string>[] = []

    for (let before in words) {
        choices.push({
            name: before,
            value: before
        })
    }

    return {
        name: "deleteword",
        description: "delete registered word",
        options: [
            {
                name: "word",
                description: "delete this word",
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: choices
            }
        ]
    }
}

export async function deleteword(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;
    const clientUser = interaction.client.user;
    if (!clientUser) return;
    const { guildId, options } = interaction;
    const word = options.getString("word", true);
    if (!guildId) return interaction.reply("this command is unable exclude textChannel!");
    await interaction.reply("処理中");
    const result = await deleteWord(guildId, word);
    const embed = new EmbedBuilder({
        author: {
            name: clientUser.username
        }
    });
    if (result) {
        embed.setDescription("削除成功");
        embed.setColor(Colors.Blue);
        embed.addFields({
            name: word,
            value: "を単語辞書から削除しました"
        });
    } else {
        embed.setDescription("エラー");
        embed.setColor("#ff0000");
        embed.addFields(
            {
                name: word,
                value: "は単語辞書に存在しません"
            }
        );
    }

    interaction.editReply({
        embeds: [embed],
        content: ""
    });
    loadDeleteCommand(interaction.client)
}